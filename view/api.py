from flask import *
import mysql.connector
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api',__name__)
api.secret_key="any string but secret"

def db_connection():
    mydb = None
    try:
        mydb = mysql.connector.connect(
        host = "localhost",
        port = 3306,
        user = "root",
        database = "travel",
        password = "azaz1919",
        charset = "utf8"
        )
    except mysql.connector.Error as e:
        print(e)
    return mydb
    
@api.route("/api/attractions", methods=['GET'])
def attractions():
    try:
        page = int(request.args.get('page', 0))
        nextPage = page + 1
        keyword = request.args.get('keyword', '')
        keyword2 = '%' + keyword + '%'
        datafrom = int(page) * 12
        dataNumPage = 12
        sql = """
            SELECT * 
            FROM (SELECT id, name, category, description, address, transport, mrt, latitude, longitude, images
            FROM attractions 
            WHERE name like %s order by id)
            as a LIMIT %s,%s;
        """
        val = (keyword2, datafrom, dataNumPage)
        mydb = db_connection()
        mycursor = mydb.cursor()
        mycursor.execute(sql, val)
        num = mycursor.fetchall()
        myresult = []
        for i in range(len(num)):
            id = num[i][0]
            name = num[i][1]
            category = num[i][2]
            description  = num[i][3]
            address = num[i][4]
            transport = num[i][5]
            mrt = num[i][6]
            latitude = num[i][7]
            longitude = num[i][8]
            images = num[i][9]
            myresults = {
                "id": id,
                "name": name,
                "category": category,
                "description": description,
                "address": address,
                "transport": transport,
                "mrt": mrt,
                "latitude": latitude,
                "longitude": longitude,
                "images": eval(images)
            }
            myresult.append(myresults)
            
        # 查下一頁
        sql = """
            SELECT * 
            FROM (SELECT name 
            FROM attractions 
            WHERE name like %s ORDER BY id)
            as a LIMIT %s,%s;
        """
        val = (keyword2, datafrom+12, 1)
        mycursor.execute(sql, val)
        num = mycursor.fetchall()
        if num == []:
            nextPage = None
            
        mydb.close()
        return Response(json.dumps({
            "nextPage": nextPage,
            "data": myresult
        }, sort_keys = False), mimetype="application/json")
    except:
        return Response(json.dumps({
            "error": True,
            "message": "伺服器錯誤"
        }, sort_keys = False), mimetype="application/json"), 500
        
@api.route("/api/attraction/<int:attractionId>")
def attraction_id(attractionId):
    try:
        sql = """
            SELECT id, name, category, description, address, transport, mrt, latitude, longitude, images
            FROM attractions WHERE id = %s;
        """
        val = (attractionId, )
        mydb = db_connection()
        mycursor = mydb.cursor()
        mycursor.execute(sql, val)
        num = mycursor.fetchone()
        id = num[0]
        name = num[1]
        category = num[2]
        description  = num[3]
        address = num[4]
        transport = num[5]
        mrt = num[6]
        latitude = num[7]
        longitude = num[8]
        images = num[9]
        myresults = {
                    "id": id,
                    "name": name,
                    "category": category,
                    "description": description,
                    "address": address,
                    "transport": transport,
                    "mrt": mrt,
                    "latitude": latitude,
                    "longitude": longitude,
                    "images": eval(images)
                }
        
        mydb.close()
        return Response(json.dumps({
            'data': myresults
        }, sort_keys = False), mimetype="application/json")
    except:
        return Response(json.dumps({
            "error": True,
            "message": "伺服器錯誤"
        }, sort_keys = False), mimetype="application/json"), 500
        
@api.route("/api/user", methods=["GET"])
def getUser():
    if request.method == 'GET':
        # name = request.args.get('name')
        email = request.args.get('email')
        mydb = db_connection()
        mycursor = mydb.cursor()
        sql = """
            SELECT id, name, email FROM user WHERE email = %s;
        """
        val = (email, )
        mycursor.execute(sql, val)
        num = mycursor.fetchone()
        if num:
            return {
                "data": {
                    "id": num[0],
                    "name": num[1],
                    "email": num[2]
                }
            }
        else:
            return {
                'data': None
            }
            
@api.route("/api/user", methods=["POST"])
def postUser():
    try:
        if request.method == 'POST':
            userDetails = request.form
            name = userDetails['name_new']
            email = userDetails['email_new']
            password = userDetails['password_new']
            
            sql = """
                SELECT count(email) FROM user WHERE email = %s;
            """
            val = (email, )
            mydb = db_connection()
            mycursor = mydb.cursor()
            mycursor.execute(sql, val)
            num = tuple(mycursor)[0][0]
            if num:
                result = "帳號已經被註冊"
                return {
                    'error': True,
                    'message': result
                    }, 400
            elif name == '' or email == '' or password == '':
                result = "請輸入完整資訊，謝謝"
                return {
                    'error': True,
                    'message': result
                    }, 400
            else:
                sql = """
                    INSERT INTO user(name, email, password) VALUES (%s, %s, %s);
                """
                val = (name, email, password, )
                mycursor.execute(sql, val)
                mydb.commit()
                return {
                    "ok": True
                    }, 200
    except:
        return Response(json.dumps({
            "error": True,
            "message": "伺服器錯誤"
        }, sort_keys = False), mimetype="application/json"), 500
        
@api.route("/api/user", methods=["PATCH"])
def patchUser():       
    try:
        req = request.get_json()
        email = req["email"]
        password = req["password"]
            
        sql = """
            SELECT COUNT(*) FROM user WHERE email = %s AND password = %s;
        """
        val = (email, password )
        mydb = db_connection()
        mycursor = mydb.cursor()
        mycursor.execute(sql, val)
        num = mycursor.fetchone()[0]
        if num == 1:
            session["id"] = num[0]
            session["name"] = num[1]
            session["email"] = num[2]
            session["password"] = num[3]
            return {
                "ok": True
            }, 200
        elif (email == "" and password == "") or (email == "" and password != "") or (email != "" and password == ""):
            result = "請輸入完整資訊"
            return {
                "error": True,
                "message": result
            }, 400
        else:
            result = "帳號、密碼錯誤"
            return {
                "error": True,
                "message": result
            }, 400
    except:
        return Response(json.dumps({
            "error": True,
            "message": "伺服器錯誤"
        }, sort_keys = False), mimetype="application/json"), 500

@api.route("/api/user", methods=["DELETE"])
def deleteUser():    
    if request.method == "DELETE":
        session.pop('email', None)
        return {
            "ok": True
        }