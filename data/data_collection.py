import json
import mysql.connector
from encodings import utf_8

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

mydb = db_connection()
mycursor = mydb.cursor()

data = open('taipei-attractions.json', 'r', encoding='utf-8').read()
obj = json.loads(data)
information = obj["result"]["results"]

for i in information:
    id = i["_id"]
    id2 = str(id)
    name = i["stitle"]
    category = i["CAT2"]
    description = i["xbody"]
    address = i["address"].replace(' ', '')
    transport = i["info"]
    mrt = i["MRT"]
    latitude = i["latitude"]
    longitude = i["longitude"]
    image = i["file"].split('https')
    image.pop(0)
    output = []
    for j in image:
        total = 'https' + j
        last = total.split('.')[-1].lower()
        if last == 'jpg' or last == 'JPG' or last == 'png' or last == 'PNG':
            https = "https"
            output.append(https + j)
            # output.append('https' + j)
            # str1 = ''.join(str(e) for e in output)
            # str2 = str1.split('https')
            # str2.pop(0)
            # for k in str2:
            #     test2 = 'https' + k
        else:
            continue
    total_data = []
    total_data.append(id2)
    total_data.append(name)
    total_data.append(address)
    total_data.append(transport)
    total_data.append(mrt)
    total_data.append(latitude)
    total_data.append(longitude)
    total_data.append(test2)
    
    id = total_data[0]
    name = total_data[1]
    address = total_data[2]
    transport = total_data[3]
    mrt = total_data[4]
    latitude = total_data[5]
    longitude = total_data[6]
    images = total_data[7]
    sql = """
        INSERT INTO attractions (id, name, address, transport, mrt, latitude, longitude, images)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """
    val = (id, name, address, transport, mrt, latitude, longitude, images, )
    mycursor.execute(sql, val)
mydb.commit()
mydb.close()