import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(req: Request) {
  try {
    const accessToken = req.headers.get("accessToken");
    // Puppeteer 브라우저 실행
    const browser = await puppeteer.launch({
      headless: true, // 서버에서 headless 모드로 실행
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // 배포 환경을 위한 보안 옵션
    });
    const page = await browser.newPage();

    await page.setExtraHTTPHeaders({
      Authorization: `Bearer ${accessToken}`,
    });

    // 캡처할 URL로 이동
    await page.goto("http://localhost:3000/design/testtest", {
      waitUntil: "networkidle2",
    }); // 캡처할 URL을 하드코딩하거나 필요 시 매개변수로 설정 가능
    await page.waitForSelector("button");

    // 페이지 스크린샷 캡처
    const screenshot = await page.screenshot({ type: "png" });

    // 브라우저 닫기
    await browser.close();

    // 이미지 응답 반환
    return new NextResponse(screenshot, {
      headers: {
        "Content-Type": "image/png",
      },
    });
  } catch (error) {
    console.error("스크린샷 캡처 중 오류 발생:", error);
    return NextResponse.json({ error: "스크린샷 캡처 실패" }, { status: 500 });
  }
}
