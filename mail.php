<?php
// --- 設定：自分のメールアドレスをここに入れる ---
$to = "your-email@example.com"; // ★ここに自分のメアドを入れてください
$subject = "【ポートフォリオ】お問い合わせがありました";

// --- フォームからのデータを受け取る ---
// htmlの各inputの「name属性」と一致させる必要があります
$name    = $_POST['name']    ?? '';
$kana    = $_POST['kana']    ?? '';
$email   = $_POST['email']   ?? '';
$company = $_POST['company'] ?? '（未入力）';
$message = $_POST['message'] ?? '';

// --- メールの本文を組み立てる ---
$body = "ポートフォリオサイトからお問い合わせがありました。\n\n";
$body .= "--------------------------------------------------\n";
$body .= "【お名前】\n$name\n\n";
$body .= "【ふりがな】\n$kana\n\n";
$body .= "【メールアドレス】\n$email\n\n";
$body .= "【会社名】\n$company\n\n";
$body .= "【お問い合わせ内容】\n$message\n";
$body .= "--------------------------------------------------\n";

// --- メールのヘッダー設定 ---
$headers = "From: $email\n";
$headers .= "Reply-To: $email\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\n";

// --- 送信処理 ---
if (mb_send_mail($to, $subject, $body, $headers)) {
    // 送信成功：サンクスページ（thanks.html）へ移動
    header("Location: thanks.html");
    exit;
} else {
    // 送信失敗
    echo "送信に失敗しました。システムエラーの可能性があります。";
}
?>