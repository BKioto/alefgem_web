// src/lib/zibal.ts

const ZIBAL_MERCHANT = process.env.ZIBAL_MERCHANT;

// این تابع درخواست پرداخت را به زیبال می‌فرستد
export async function requestPayment(amount: number, description: string, callbackUrl: string, mobile?: string) {
  const response = await fetch("https://gateway.zibal.ir/v1/request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      merchant: ZIBAL_MERCHANT,
      amount: amount * 10, // تبدیل تومان به ریال (چون زیبال ریال می‌گیرد)
      callbackUrl: callbackUrl,
      description: description,
      mobile: mobile,
    }),
  });

  return response.json();
}

// این تابع بعد از بازگشت از بانک، چک می‌کند پرداخت موفق بوده یا نه
export async function verifyPayment(trackId: string) {
  const response = await fetch("https://gateway.zibal.ir/v1/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      merchant: ZIBAL_MERCHANT,
      trackId: trackId,
    }),
  });

  return response.json();
}