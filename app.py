from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# 資料庫配置
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///example.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# 資料表定義
class Member(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone = db.Column(db.String(20))
    password = db.Column(db.String(255), nullable=False)

# 初始化資料庫
with app.app_context():
    db.create_all()

# 顯示會員資料
@app.route('/profile')
def profile():
    member_id = 1  # 假設 ID 為 1，實際情況中會從登入資訊獲取
    member = Member.query.get(member_id)
    return render_template('index.html', member=member)

# 更新會員資料
@app.route('/api/members', methods=['POST'])
def update_member():
    data = request.json
    member_id = 1  # 假設 ID 為 1，實際情況中會從登入資訊獲取
    member = Member.query.get(member_id)

    if not member:
        return jsonify({'message': '會員不存在'}), 404

    member.name = data['name']
    member.email = data['email']
    member.phone = data['phone']
    member.password = data['password']

    db.session.commit()
    return jsonify({'message': '會員資料更新成功'}), 200

# 註冊新會員
@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    new_member = Member(
        name=data['raccount'],
        email=data['email'],
        password=data['rpassword']  # 注意：在生產環境中應該加密密碼
    )
    db.session.add(new_member)
    db.session.commit()
    return jsonify({'message': '註冊成功'}), 201

if __name__ == '__main__':
    app.run(debug=True)
