from flask import *
import mysql.connector

api = Blueprint('api',__name__)

def db_connection():
    mydb = None
    try:
        mydb = mysql.connector.connect(
        host = "localhost",
        port = 3306,
        user = "root",
        database = "travel",
        password = "jiggjo9182",
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
            as a LIMIT %s,%s
        """
        val = (keyword2, datafrom, dataNumPage)
        mydb = db_connection()
        mycursor = mydb.cursor()
        mycursor.execute(sql, val)
        num = mycursor.fetchall()
        myresult = [''] * (len(num))
        for i in range(0, len(num)):
            images = num[i][9].split(',')
            myresult[i] = {
                'id': num[i][0],
                'name': num[i][1],
                'category': num[i][2],
                'description': num[i][3],
                'address': num[i][4],
                'transport': num[i][5],
                'mrt': num[i][6],
                'latitude': num[i][7],
                'longitude': num[i][8],
                'images': [images[0]]
            }
            
        # 查下一頁
        sql = """
            SELECT * 
            FROM (SELECT name 
            FROM attractions 
            WHERE name like %s ORDER BY id)
            as a LIMIT %s OFFSET %s
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
