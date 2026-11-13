
const buttons = document.querySelectorAll(".filters button");
const cards = document.querySelectorAll(".spot-card");

buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        const filter = button.dataset.filter;

        // 更新按鈕顏色
        buttons.forEach(function(btn) {
            btn.classList.remove("active");
        });
        button.classList.add("active");

        // 顯示符合分類的景點
        cards.forEach(function(card) {
            if (filter === "all" ||
                card.dataset.category === filter) {
                card.hidden = false;
            } else {
                card.hidden = true;
            }
        });
    });
});

document.querySelector('[data-filter="all"]')?.click();

// 大阪行程功能
const dayButton = document.getElementById("day-plan");
const nightButton = document.getElementById("night-plan");
const tripResult = document.getElementById("trip-result");

// 只有大阪頁面才執行
if (dayButton && nightButton && tripResult) {

    dayButton.addEventListener("click", function() {
        tripResult.innerHTML = `
            <h3>白天行程</h3>
            <p>09:00 大阪城公園</p>
            <p>12:00 大阪特色午餐</p>
            <p>14:00 心齋橋購物</p>
        `;
    });

    nightButton.addEventListener("click", function() {
        tripResult.innerHTML = `
            <h3>夜晚行程</h3>
            <p>17:00 道頓堀散步</p>
            <p>18:30 品嚐章魚燒與大阪燒</p>
            <p>20:00 欣賞道頓堀夜景</p>
        `;
    });

}


// ========== 京都景點互動 ==========

const kyotoButtons = document.querySelectorAll(
    ".kyoto-more-btn"
);

kyotoButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // 找到按鈕後面的景點詳細資訊
        const extra = button.nextElementSibling;

        // 切換顯示與隱藏
        extra.hidden = !extra.hidden;

        if (extra.hidden) {
            button.textContent = "查看更多";
            button.setAttribute("aria-expanded", "false");
        } else {
            button.textContent = "收起資訊";
            button.setAttribute("aria-expanded", "true");
        }

    });

});


// ========== 奈良小測驗 ==========

const naraQuiz = document.getElementById("nara-quiz");
const naraResult = document.getElementById("nara-result");

// 只有奈良頁面才執行
if (naraQuiz && naraResult) {

    naraQuiz.addEventListener("submit", function(event) {

        // 防止表單提交後重新整理網頁
        event.preventDefault();

        // 取得使用者作答資料
        const formData = new FormData(naraQuiz);

        // 標準答案
        const correctAnswers = {
            q1: "b",
            q2: "b",
            q3: "a"
        };

        // 確認三題都有回答
        for (const question in correctAnswers) {
            if (!formData.has(question)) {
                naraResult.textContent =
                    "請先回答全部三道題目！";
                return;
            }
        }

        let score = 0;

        // 計算答對題數
        for (const question in correctAnswers) {
            if (formData.get(question) ===
                correctAnswers[question]) {
                score++;
            }
        }

        // 顯示測驗結果
        if (score === 3) {
            naraResult.textContent =
                "恭喜你！全部答對！3 / 3 分";
        } else {
            naraResult.textContent =
                "你的分數：" + score + " / 3 分";
        }

    });

    // 重新作答時清除分數
    naraQuiz.addEventListener("reset", function() {
        naraResult.textContent = "";
    });

}
