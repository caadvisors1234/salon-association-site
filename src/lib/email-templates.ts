// メールテンプレートの型定義
export interface EmailTemplateData {
  company?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  clientIP: string;
  timestamp: string;
  messagePreview?: string;
}

// テンプレート設定
export interface EmailConfig {
  subject: string;
  recipients: string[];
  cc?: string[];
  bcc?: string[];
  replyTo?: string;
  fromName?: string;
}

// 管理者向けHTMLテンプレート
export function getAdminHTMLTemplate(data: EmailTemplateData): string {
  return `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>お問い合わせ受信通知</title>
    <style>
        body { 
            font-family: 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background-color: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            border-bottom: 3px solid #e74c3c;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #e74c3c;
        }
        .content-section {
            margin-bottom: 25px;
        }
        .label {
            font-weight: bold;
            color: #555;
            display: inline-block;
            width: 120px;
        }
        .value {
            background-color: #f8f9fa;
            padding: 8px 12px;
            border-radius: 4px;
            margin-top: 5px;
            border-left: 4px solid #e74c3c;
        }
        .message-box {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 6px;
            border-left: 4px solid #e74c3c;
            white-space: pre-wrap;
        }
        .footer {
            border-top: 1px solid #eee;
            padding-top: 20px;
            margin-top: 30px;
            font-size: 12px;
            color: #666;
        }
        .urgent {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            padding: 15px;
            border-radius: 6px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">AIビューティーサロン推進協会</div>
            <h2 style="margin: 10px 0 0 0; color: #333;">新しいお問い合わせ</h2>
        </div>
        
        <div class="urgent">
            <strong>📧 新しいお問い合わせが届きました</strong><br>
            速やかに対応をお願いいたします。
        </div>

        <div class="content-section">
            <div class="label">会社名:</div>
            <div class="value">${data.company || '未入力'}</div>
        </div>

        <div class="content-section">
            <div class="label">お名前:</div>
            <div class="value">${data.name}</div>
        </div>

        <div class="content-section">
            <div class="label">メールアドレス:</div>
            <div class="value">${data.email}</div>
        </div>

        <div class="content-section">
            <div class="label">電話番号:</div>
            <div class="value">${data.phone || '未入力'}</div>
        </div>

        <div class="content-section">
            <div class="label">お問い合わせ内容:</div>
            <div class="message-box">${data.message}</div>
        </div>

        <div class="footer">
            <p><strong>受信情報</strong></p>
            <p>送信者IP: ${data.clientIP}</p>
            <p>受信日時: ${data.timestamp}</p>
            <p>このメールは AIビューティーサロン推進協会のウェブサイトから自動送信されました。</p>
        </div>
    </div>
</body>
</html>
  `;
}

// 自動返信用HTMLテンプレート
export function getAutoReplyHTMLTemplate(data: EmailTemplateData): string {
  const messagePreview = data.message.length > 100 
    ? data.message.substring(0, 100) + '...' 
    : data.message;

  return `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>お問い合わせありがとうございます</title>
    <style>
        body { 
            font-family: 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif;
            line-height: 1.8;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background-color: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #27ae60;
            padding-bottom: 30px;
            margin-bottom: 40px;
        }
        .logo {
            font-size: 28px;
            font-weight: bold;
            color: #27ae60;
            margin-bottom: 10px;
        }
        .thank-you {
            background: linear-gradient(135deg, #27ae60, #2ecc71);
            color: white;
            padding: 25px;
            border-radius: 8px;
            text-align: center;
            margin-bottom: 30px;
        }
        .content-section {
            margin-bottom: 25px;
            padding: 20px;
            background-color: #f8f9fa;
            border-radius: 6px;
            border-left: 4px solid #27ae60;
        }
        .next-steps {
            background-color: #e8f5e8;
            padding: 20px;
            border-radius: 6px;
            margin: 20px 0;
        }
        .contact-info {
            background-color: #f0f8ff;
            padding: 20px;
            border-radius: 6px;
            border-left: 4px solid #3498db;
        }
        .footer {
            border-top: 1px solid #eee;
            padding-top: 20px;
            margin-top: 40px;
            font-size: 14px;
            color: #666;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">一般社団法人AIビューティーサロン推進協会</div>
            <p style="margin: 0; color: #666;">AI Beauty Salon Promotion Association</p>
        </div>
        
        <div class="thank-you">
            <h2 style="margin: 0 0 10px 0;">🎉 お問い合わせありがとうございます</h2>
            <p style="margin: 0; font-size: 18px;">${data.name} 様</p>
        </div>

        <div class="content-section">
            <h3 style="color: #27ae60; margin-top: 0;">📨 受付完了のお知らせ</h3>
            <p>この度は、一般社団法人AIビューティーサロン推進協会にお問い合わせいただき、誠にありがとうございます。</p>
            <p>以下の内容でお問い合わせを受け付けいたしました：</p>
            
            <div style="margin: 20px 0; padding: 15px; background-color: white; border-radius: 4px;">
                <p><strong>お問い合わせ内容の概要:</strong></p>
                <div style="background-color: #f5f5f5; padding: 10px; border-radius: 4px; white-space: pre-wrap;">${messagePreview}</div>
            </div>
        </div>

        <div class="footer">
            <p>このメールは自動送信されています。</p>
            <p>一般社団法人AIビューティーサロン推進協会</p>
        </div>
    </div>
</body>
</html>
  `;
}

// テキスト版テンプレート（フォールバック用）
export function getAdminTextTemplate(data: EmailTemplateData): string {
  return `
【新しいお問い合わせ】

会社名: ${data.company || '未入力'}
氏名: ${data.name}
メールアドレス: ${data.email}
電話番号: ${data.phone || '未入力'}

お問い合わせ内容:
${data.message}

---
送信者IP: ${data.clientIP}
送信日時: ${data.timestamp}

このメールは AIビューティーサロン推進協会のウェブサイトから自動送信されました。
  `;
}

export function getAutoReplyTextTemplate(data: EmailTemplateData): string {
  const messagePreview = data.message.length > 100 
    ? data.message.substring(0, 100) + '...' 
    : data.message;

  return `
${data.name} 様

お問い合わせありがとうございます

この度は、一般社団法人AIビューティーサロン推進協会にお問い合わせいただき、誠にありがとうございます。

以下の内容でお問い合わせを受け付けいたしました：

お問い合わせ内容の概要:
${messagePreview}

  `;
}

// メール設定を取得
export function getEmailConfigs(): {
  adminNotification: EmailConfig;
  autoReply: EmailConfig;
} {
  // 環境変数から複数の管理者メールアドレスを取得
  const adminEmails = process.env.CONTACT_FORM_TO_EMAIL?.split(',').map(email => email.trim()) || [];
  const ccEmails = process.env.CONTACT_FORM_CC_EMAIL?.split(',').map(email => email.trim()) || [];
  const bccEmails = process.env.CONTACT_FORM_BCC_EMAIL?.split(',').map(email => email.trim()) || [];

  return {
    adminNotification: {
      subject: '🚨【重要】新しいお問い合わせ - {{name}}様より',
      recipients: adminEmails,
      cc: ccEmails,
      bcc: bccEmails,
    },
    autoReply: {
      subject: '✅ お問い合わせ受付完了のお知らせ - 一般社団法人AIビューティーサロン推進協会',
      recipients: [], // 送信者のメールアドレスが動的に設定される
      fromName: '一般社団法人AIビューティーサロン推進協会',
      replyTo: process.env.RESEND_FROM_EMAIL,
    }
  };
}

// 件名のテンプレート変数を置換
export function replaceSubjectTemplate(subject: string, data: EmailTemplateData): string {
  return subject
    .replace('{{name}}', data.name)
    .replace('{{company}}', data.company || '')
    .replace('{{timestamp}}', data.timestamp);
}