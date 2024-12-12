document.addEventListener("DOMContentLoaded", () => {
    // 獲取所有相關 DOM 元素
    const modals = {
      login: document.getElementById("loginModal"),
      profile: document.getElementById("profileModal"),
    };
  
    const togglePasswordBtn = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");
  
    // 通用模態框顯示/隱藏函數
    function toggleModal(modalKey, action) {
      modals[modalKey].style.display = action === "show" ? "block" : "none";
    }
  
    // 監聽登入按鈕
    document.getElementById("loginBtn").addEventListener("click", () => {
      toggleModal("login", "show");
    });
  
    // 監聽會員資料按鈕
    document.getElementById("profileBtn").addEventListener("click", () => {
      toggleModal("profile", "show");
    });
  
    // 監聽模態框背景點擊事件
    window.addEventListener("click", (event) => {
      Object.values(modals).forEach((modal) => {
        if (event.target === modal) {
          modal.style.display = "none";
        }
      });
    });
  
    // 關閉按鈕
    document.querySelectorAll(".close").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const modalKey = e.target.closest(".modal").id.replace("Modal", "");
        toggleModal(modalKey, "hide");
      });
    });
  
    // 切換密碼顯示/隱藏
    togglePasswordBtn.addEventListener("click", () => {
      const isPassword = passwordInput.getAttribute("type") === "password";
      passwordInput.setAttribute("type", isPassword ? "text" : "password");
      togglePasswordBtn.textContent = isPassword ? "隱藏密碼" : "顯示密碼";
    });
  
    // 表單提交處理
    document.getElementById("profileForm").addEventListener("submit", (event) => {
      event.preventDefault(); // 阻止表單默認提交行為
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());
  
      console.log("提交會員資料：", data);
      alert("會員資料已提交！");
      toggleModal("profile", "hide");
    });
  });
  