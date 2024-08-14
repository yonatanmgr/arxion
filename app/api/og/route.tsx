import { ImageResponse } from "next/og";
import papersApi from "../papers";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    // ?title=<title>
    const hasTitle = searchParams.has("id");

    if (hasTitle) {
      const computerModernRegular = await fetch(
        new URL("https://www.philihp.com/assets/fonts/cmunrm.otf"),
      ).then((res) => res.arrayBuffer());

      const computerModernBold = await fetch(
        new URL("https://www.philihp.com/assets/fonts/cmunbx.otf"),
      ).then((res) => res.arrayBuffer());

      const paper = await papersApi.fetchByIds([
        searchParams.get("id") as string,
      ]);

      const title = paper.papers[0].title[0];
      let abstract = paper.papers[0].summary[0].slice(0, 450);

      if (abstract.length < paper.papers[0].summary[0].length) {
        abstract += "...";
      }

      return new ImageResponse(
        (
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              position: "relative",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
            }}
          >
            <div tw="bg-gray-50 flex h-full">
              <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
                <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
                  <svg
                    fill="currentColor"
                    style={{
                      transform: "scale(0.66)",
                      marginLeft: -60,
                    }}
                    //   tw="flex h-12 w-fit cursor-pointer flex-row items-center gap-1 fill-zinc-800 text-center font-serif font-bold transition-colors hover:fill-arxiv-red max-sm:h-8 dark:fill-zinc-50 dark:hover:fill-red-500"
                    width="364"
                    height="117"
                    viewBox="0 0 364 117"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M292.021 89.0084V39.0926H283.46C279.231 39.0926 277.118 37.4772 277.118 34.2464C277.118 32.7388 277.487 31.608 278.228 30.8541C279.073 29.9926 279.814 29.508 280.448 29.4002C281.189 29.2924 282.192 29.2387 283.46 29.2387H296.619C299.579 29.2387 301.375 29.7771 302.01 30.8541C302.644 31.9311 302.961 34.1386 302.961 37.4772C309.513 31.3387 317.282 28.2694 326.267 28.2694C341.487 28.2694 349.097 36.1311 349.097 51.8542V89.0084H357.658C358.927 89.0084 359.878 89.0621 360.512 89.1699C361.253 89.2777 361.991 89.7623 362.732 90.6238C363.576 91.3777 364 92.5085 364 94.0161C364 97.2469 361.887 98.8623 357.658 98.8623H329.596C328.328 98.8623 327.325 98.8085 326.584 98.7008C325.95 98.593 325.209 98.1624 324.364 97.4084C323.624 96.547 323.254 95.3622 323.254 93.8546C323.254 90.6238 325.368 89.0084 329.596 89.0084H338.157V52.8235C338.157 47.762 337.313 44.0466 335.621 41.6772C333.929 39.3079 330.495 38.1234 325.315 38.1234C322.038 38.1234 318.763 38.7695 315.486 40.0618C312.315 41.3542 309.409 43.7773 306.766 47.3311C304.229 50.885 302.961 55.3003 302.961 60.5774V89.0084H311.522C312.791 89.0084 313.742 89.0621 314.376 89.1699C315.117 89.2777 315.855 89.7623 316.596 90.6238C317.44 91.3777 317.864 92.5085 317.864 94.0161C317.864 97.2469 315.751 98.8623 311.522 98.8623H294.96C294.069 98.8623 293.623 99.9396 294.253 100.569L302.716 109.03L294.743 117L270.162 92.4249C264.204 96.6986 257.364 98.8423 249.642 98.8562L164.905 98.8623C160.677 98.8623 158.563 97.2469 158.563 94.0161C158.563 92.5085 158.933 91.3777 159.673 90.6238C160.518 89.7623 161.258 89.2777 161.892 89.1699C162.632 89.0621 163.636 89.0084 164.905 89.0084H168.234L142.074 54.762L117.5 89.0084H121.147C125.48 89.0084 127.647 90.6775 127.647 94.0161C127.647 97.2469 125.48 98.8623 121.147 98.8623H64.0142C55.2416 98.8623 50.2054 97.1391 47.88 93.693C42.0667 97.7853 34.5624 99.8315 25.3669 99.8315C17.9681 99.8315 11.8907 97.7315 7.13444 93.5315C2.37815 89.2237 0 84.1084 0 78.1852C0 70.8622 4.06928 65.1005 12.2078 60.9005C20.4521 56.5927 31.7614 54.3311 46.136 54.1158C46.136 48.6234 44.3921 44.5312 40.9041 41.8388C37.4162 39.0388 32.6599 37.6387 26.6352 37.6387C23.9928 37.6387 22.0375 37.6925 20.7691 37.8003C19.5008 37.9081 18.7081 38.0696 18.391 38.2849C18.1797 38.5002 18.0739 38.9311 18.0739 39.5772C17.9681 42.1619 17.1754 44.0466 15.6958 45.2311C14.3217 46.4157 12.7892 47.0081 11.098 47.0081C9.0898 47.0081 7.39868 46.3619 6.02464 45.0696C4.65059 43.7773 3.96358 41.9466 3.96358 39.5772C3.96358 31.7155 11.4679 27.7848 26.4767 27.7848C36.6234 27.7848 44.2335 30.3157 49.3069 35.3772C54.486 40.3312 57.0755 46.1466 57.0755 52.8235V87.7161C58.978 88.5775 61.9376 89.0084 65.9539 89.0084H72.5756V39.0926H64.0142C59.7863 39.0926 57.6725 37.4772 57.6725 34.2464C57.6725 32.7388 58.0424 31.608 58.7823 30.8541C59.6278 29.9926 60.3677 29.508 61.0019 29.4002C61.7419 29.2924 62.7459 29.2387 64.0142 29.2387H77.1733C80.1329 29.2387 81.9296 29.7771 82.5638 30.8541C83.198 31.9311 83.515 34.3542 83.515 38.1234C89.0113 31.554 95.5115 28.2695 103.016 28.2695C106.715 28.2695 109.622 29.3465 111.736 31.5002C113.85 33.5465 114.907 35.8081 114.907 38.2849C114.907 40.3312 114.22 42.0003 112.846 43.2926C111.577 44.585 110.044 45.2311 108.248 45.2311C106.768 45.2311 105.288 44.7465 103.809 43.7773C102.434 42.7002 101.695 40.8695 101.589 38.2849C97.6781 38.7158 94.296 40.4927 91.4422 43.6157C88.6942 46.7387 86.6859 50.4541 85.4176 54.762C84.1492 58.962 83.515 63.5389 83.515 68.4928V89.0084H104.183L135.891 46.5234L106.878 10.0155H99.1092C94.7758 10.0155 92.609 8.3463 92.609 5.00773C92.609 1.77694 94.7758 0.161538 99.1092 0.161538H123.842C128.175 0.161538 130.342 1.8307 130.342 5.16927C130.342 8.40006 128.175 10.0155 123.842 10.0155H120.83L142.074 37.1541L161.892 10.0155H158.404C154.071 10.0155 151.904 8.3463 151.904 5.00773C151.904 1.77694 154.071 0.161538 158.404 0.161538H183.137C187.47 0.161538 189.637 1.8307 189.637 5.16927C189.637 8.40006 187.47 10.0155 183.137 10.0155H175.368L148.258 46.5234L181.869 89.0084H188.904H189.796H197.465V39.0926H189.697C185.363 39.0926 183.197 37.4234 183.197 34.0849C183.197 30.8541 185.363 29.2387 189.697 29.2387H202.063C204.706 29.2387 206.397 29.7233 207.137 30.6925C207.982 31.554 208.405 33.2772 208.405 35.8618V89.0084C214.001 89.0668 219.604 89.0467 225.199 89.187C224.97 88.9677 224.742 88.7446 224.516 88.5178C217.54 81.5178 214.052 73.01 214.052 62.9945C214.052 53.0868 217.54 44.579 224.516 37.4712C231.386 30.3635 239.736 26.8096 249.566 26.8096C259.396 26.8096 267.798 30.3635 274.774 37.4712C281.644 44.579 285.08 53.0868 285.08 62.9945C285.08 71.1768 282.787 78.3529 278.202 84.5225L279.76 86.0804C281.635 87.9552 284.178 89.0084 286.83 89.0084H292.021ZM15.2201 86.5853C12.3664 84.2159 10.9395 81.416 10.9395 78.1852C10.9395 74.3083 13.8461 71.0237 19.6593 68.3313C25.5782 65.6389 34.4038 64.0775 46.136 63.6466V77.216C46.136 78.8314 46.0303 80.0699 45.8189 80.9314C45.7132 81.7928 45.1848 82.8699 44.2335 84.1622C43.2823 85.4545 41.8554 86.5315 39.9529 87.393C36.2536 89.1162 31.8144 89.9776 26.6352 89.9776C21.9847 89.9776 18.1797 88.8468 15.2201 86.5853ZM267.006 81.087C271.762 75.7024 274.14 69.2946 274.14 61.8637C274.14 54.756 271.709 48.779 266.847 43.9328C261.985 39.0866 256.225 36.6635 249.566 36.6635C242.907 36.6635 237.148 39.0866 232.285 43.9328C227.422 48.779 224.992 54.756 224.992 61.8637C224.992 69.2946 227.422 75.7024 232.285 81.087C237.041 86.364 242.801 89.0024 249.566 89.0024C256.435 89.0024 262.249 86.364 267.006 81.087Z"
                    />
                    <path d="M194.77 13.8924C193.291 12.277 192.551 10.3385 192.551 8.07698C192.551 5.81543 193.291 3.93071 194.77 2.42309C196.356 0.807696 198.258 0 200.478 0C202.697 0 204.547 0.807696 206.027 2.42309C207.612 3.93071 208.405 5.81543 208.405 8.07698C208.405 10.3385 207.612 12.277 206.027 13.8924C204.547 15.4 202.697 16.154 200.478 16.154C198.258 16.154 196.356 15.4 194.77 13.8924Z" />
                  </svg>
                  <span
                    style={{
                      fontFamily: '"Computer Modern Bold"',
                      fontSize: "3.2rem",
                      textWrap: "balance",
                      marginBottom: "1.5rem",
                    }}
                  >
                    {title}
                  </span>
                  <span
                    style={{
                      fontFamily: '"Computer Modern"',
                      fontSize: "2rem",
                    }}
                  >
                    {abstract}
                  </span>
                </h2>
              </div>
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
          fonts: [
            {
              data: computerModernRegular,
              name: "Computer Modern",
              weight: 400,
              style: "normal",
            },
            {
              data: computerModernBold,
              name: "Computer Modern Bold",
              weight: 700,
              style: "normal",
            },
          ],
        },
      );
    }
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
