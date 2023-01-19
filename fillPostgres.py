import psycopg2
conn = psycopg2.connect("host=localhost dbname=codes user=user password=pass")
from datetime import datetime, timezone

dt = datetime.now(timezone.utc)

cur = conn.cursor()
# cur.execute('SELECT * FROM modules')
# all = cur.fetchall()


# cur.execute(
#     "INSERT INTO part_of_speeches VALUES(%s,%s,%s,%s)",
#     (1, "noun",dt,dt)
# )
# conn.commit()
with open('en_lv_dict.txt', 'r') as f:
    i=1
    while f:
        lvLine  = f.readline().strip()
        if lvLine == "":
            break
        cur.execute(
            "INSERT INTO lv_words VALUES(%s, %s, %s,%s,%s)",
             (i, 1, lvLine,dt,dt)
        )
        conn.commit()
        enLine  = f.readline().strip()
        if enLine == "":
            break
        cur.execute(
            "INSERT INTO en_words VALUES(%s, %s,%s,%s)",
             (i, enLine,dt,dt)
        )
        conn.commit()
        cur.execute(
            "INSERT INTO en_lv_joins VALUES(%s, %s, %s,%s,%s)",
            (i, i, i,dt,dt)
        )
        conn.commit()
        i+=1

cur.execute('SELECT * FROM en_lv_joins')

print(all)
cur.close()
conn.close()