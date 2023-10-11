import sqlite3

conn = sqlite3.connect('diva.db')
c = conn.cursor()

c.execute("DELETE FROM alembic_version WHERE version_num = '0f6b74cacb62'")
conn.commit()
conn.close()
