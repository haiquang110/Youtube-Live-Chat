import { LiveChat } from 'youtube-chat';

// Cấu hình ID video Livestream thực tế của bạn
const liveVideoId = 'SCLBxCmw2Y8'; 

if (!liveVideoId || liveVideoId === 'SCLBxCmw2Y8') {
    console.warn('⚠️ Cảnh báo: Vui lòng đảm bảo "SCLBxCmw2Y8" là ID một livestream đang PHÁT TRỰC TIẾP thực tế để nhận dữ liệu.');
}

// Khởi tạo LiveChat đối tượng
const chat = new LiveChat({ liveId: liveVideoId });

// ==========================================
// 1. SỰ KIỆN: START (Kết nối thành công)
// ==========================================
chat.on('start', (actionId) => {
    console.log(`\n⚡ [SYSTEM] Đã kích hoạt kết nối thành công!`);
    console.log(`🆔 [ACTION ID]: ${actionId}`);
    console.log(`📡 [STATUS]: Đang nghe luồng dữ liệu realtime nhanh nhất...\n`);
});

// ==========================================
// 2. SỰ KIỆN: CHAT (Realtime Full Data)
// ==========================================
chat.on('chat', (chatItem) => {
    try {
        // --- TRÍCH XUẤT RAW DATA TUYỆT ĐỐI ---
        // In ra console log dạng JSON thô cực nhanh để debug full cấu hình
        console.log(`📦 [RAW EVENT] Received:`, JSON.stringify(chatItem));

        // --- PHÂN TÁCH BIẾN BÀI BẢN ---
        const {
            id: messageId,
            timestamp,
            type, // 'chat' hoặc 'superchat' ...
            message,
            author,
            superchat,
            sticker
        } = chatItem;

        // Xử lý chuỗi tin nhắn mượt mà (Gộp text thuần + phân tách cấu trúc emoji)
        const fullMessageText = message 
            ? message.map(item => item.text || item.emojiText || '').join('') 
            : '';

        // Phân tách chi tiết thông tin Tác giả (Author)
        const {
            id: authorId,
            name: authorName,
            thumbnail, // { url, width, height }
            isVerified,
            isOwner,
            isModerator,
            badges // Mảng chứa thông tin danh hiệu chi tiết
        } = author;

        const avatarUrl = thumbnail?.url || '';

        // Xác định phân quyền hiển thị trực quan
        let badgeIcon = '👤 [User]';
        if (isOwner) badgeIcon = '👑 [Chủ Kênh]';
        else if (isModerator) badgeIcon = '🛠️ [Mod]';
        else if (badges && badges.length > 0) badgeIcon = '⭐ [Hội Viên]';

        // --- XỬ LÝ SỰ KIỆN ĐẶC BIỆT: SUPER CHAT / STICKER ---
        let specialEventLog = '';
        
        if (type === 'superchat' && superchat) {
            const { amount, currency, color } = superchat;
            specialEventLog = `\n💰 [SUPER CHAT EVENT] ${authorName} đã gửi ${amount} ${currency} (Màu nền: ${color})`;
        }

        if (sticker) {
            const { text: stickerText, stickerText: altText, thumbnail: stickerImg } = sticker;
            specialEventLog = `\n🎨 [STICKER EVENT] ${authorName} đã gửi Sticker: ${stickerText || altText} - Link: ${stickerImg?.url}`;
        }

        // --- LOG RA MÀN HÌNH THEO ĐỊNH DẠNG TỐI ƯU ---
        if (specialEventLog) {
            console.log(specialEventLog);
        }
        
        console.log(`🚀 [${timestamp}] ${badgeIcon} ${authorName}: ${fullMessageText}`);

    } catch (err) {
        console.error('❌ Lỗi xử lý bóc tách data sự kiện:', err.message);
    }
});

// ==========================================
// 3. SỰ KIỆN: ERROR (Bắt lỗi luồng)
// ==========================================
chat.on('error', (err) => {
    console.error(`\n❌ [ERROR EVENT]: Luồng dữ liệu gặp sự cố!`);
    console.error(`📝 Chi tiết lỗi: ${err.message}`);
    console.error(`💡 Hướng xử lý: Kiểm tra lại mạng hoặc xem livestream có bị ngắt/chuyển chế độ riêng tư không.\n`);
});

// ==========================================
// KÍCH HOẠT TIẾN TRÌNH
// ==========================================
const bootstrap = async () => {
    try {
        console.log('🔄 Đang gửi request khởi tạo cấu trúc luồng YouTube...');
        const isStarted = await chat.start();
        
        if (!isStarted) {
            console.log('❌ [SYSTEM]: Không thể start luồng kết nối.');
        }
    } catch (error) {
        console.error('❌ [CRITICAL ERROR] Thất bại khi chạy hàm bootstrap:', error);
    }
};

bootstrap();