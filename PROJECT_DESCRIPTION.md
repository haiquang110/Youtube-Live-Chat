# YouTube Live Chat Collector

## Tóm tắt

Đây là ứng dụng Node.js nhận dữ liệu chat theo thời gian thực từ một buổi livestream YouTube. Ứng dụng dùng package [`youtube-chat`](https://www.npmjs.com/package/youtube-chat), sau đó in nội dung và thông tin sự kiện ra terminal.

## Phân loại AI

Dự án hiện tại **không phải mô hình AI** và không tích hợp machine learning, mô hình ngôn ngữ, hoặc dịch vụ suy luận AI. Nó không huấn luyện, phân loại hay tạo nội dung; chức năng hiện có là nhận, trích xuất một số trường dữ liệu và hiển thị live chat.

## Luồng hoạt động

1. Kết nối tới livestream theo `liveId` được cấu hình trong `index.js`.
2. Nhận các sự kiện bắt đầu, chat và lỗi từ `youtube-chat`.
3. Ghi đối tượng chat dạng JSON cùng thời gian, nội dung, thông tin người gửi và nhãn vai trò ra terminal.
4. Ghi thêm thông tin khi nhận Super Chat hoặc sticker.

## Công nghệ

- Node.js với cú pháp ES module.
- [`youtube-chat`](https://www.npmjs.com/package/youtube-chat) để nhận dữ liệu live chat.
- Không yêu cầu API key của YouTube trong cấu hình hiện tại.

## Giới hạn

- Livestream cần đang phát và chat phải khả dụng.
- Dữ liệu nhận được phụ thuộc vào package `youtube-chat` và các thay đổi của YouTube.
- Tin nhắn và thông tin người gửi được ghi vào terminal; cần cân nhắc quyền riêng tư khi lưu hoặc chia sẻ log.