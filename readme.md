copy .env.sample => .env
sửa lại PORT, thông tin connect database như ý muốn

chạy npm install 
npm start

Khi chạy sẽ kiểm tra có user root chưa, nếu chưa có sẽ tạo, mặc định username : root , password : root

Xử lý data GraphQL trong folder GraphRoot
Khai báo Schema GraphQL trong folder schema
Khai báo Schema MongoDB trong folder models

các schema : 
user : {
    login : đăng nhập - param : {username , password} 
        => return userID dùng làm token trong headers
    create : tạo user - param : {username, password, } 
        => return nếu user có quyền root hoặc create thì mới được tạo
    read : lấy user, - Arguments : {
        skip default = 0 , 
        limit default = 10, 
        lastLogin : valid Date String || Number mặc định null, 
        createdAt : valid Date String || Number mặc định null, 
        sort {
            createdAt : 1 (tăng dần)hoặc -1(giảm dần) default = 1, 
            lastLogin 1 (tăng dần) hoặc -1(giảm dần) , default = 1
        }
    }
        => return {username ,lastLogin ,createdDate}[]
}

