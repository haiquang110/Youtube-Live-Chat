# Youtube Live Chat

Script Node.js ket nối với live chat của một buổi phát trực tiếp trên YouTube bằng package [`youtube-chat`](https://www.npmjs.com/package/youtube-chat). Tin nhắn và thông tin người gửi được in ra terminal; sự kiện Super Chat và sticker có thêm phần log riêng.

## Yêu cầu

- Node.js và npm
- ID của một video livestream đang phát công khai

## Cài đặt và chạy

1. Cài các dependency:

  ```sh
  npm install
  ```

2. Mở `index.js` và thay giá trị `liveVideoId` bằng ID video livestream cần theo dõi:

  ```js
  const liveVideoId = 'VIDEO_ID_CUA_BAN';
  ```

  ID video là phần nằm sau `v=` trong URL YouTube, hoặc sau dấu `/` trong URL dạng `youtu.be`.

3. Chạy script:

  ```sh
  node index.js
  ```

Nhấn `Ctrl+C` trong terminal để dừng chương trình.

## Dữ liệu được ghi log

- Toàn bộ đối tượng chat dạng JSON để tiện kiểm tra dữ liệu thô.
- Thời gian, tên người gửi, nội dung tin nhắn và ảnh đại diện.
- Nhãn nhận diện chủ kênh, moderator và hội viên khi dữ liệu có sẵn.
- Thông tin riêng cho Super Chat và sticker khi sự kiện có các dữ liệu đó.
- Lỗi kết nối hoặc lỗi khi khởi tạo luồng chat.

## Lưu ý

- Video phải đang phát livestream và chat phải khả dụng. Video đã kết thúc, riêng tư hoặc tắt chat có thể không kết nối được.
- Script dùng package `youtube-chat`; hoạt động phụ thuộc vào khả năng tương thích của package với YouTube và có thể thay đổi khi YouTube cập nhật dịch vụ.
- Không cần đặt YouTube API key trong project này.
