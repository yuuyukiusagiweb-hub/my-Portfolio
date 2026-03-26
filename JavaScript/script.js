$(function() {
  // --- 1. ハンバーガーメニュー (クラス名をHTMLと合わせました) ---
  const $navToggle = $('#nav-toggle');
  const $navMenu = $('.nav'); // HTMLの <nav class="nav"> に合わせる

  if ($navToggle.length && $navMenu.length) {
    $navToggle.on('click', function() {
      $(this).toggleClass('active');
      $navMenu.toggleClass('open');
      
      // 改善アドバイス：メニューが開いている時は背景をスクロールさせない
      if ($navMenu.hasClass('open')) {
        $('body').css('overflow', 'hidden');
      } else {
        $('body').css('overflow', 'auto');
      }
    });

    // メニュー内のリンクをクリックしたら閉じる
    $navMenu.find('a').on('click', function() {
      $navToggle.removeClass('active');
      $navMenu.removeClass('open');
      $('body').css('overflow', 'auto');
    });
  }

  // --- 3. About自己紹介ギミック ---
  const $flipCard = $('.flip-card');
  if ($flipCard.length) {
    // ボタンのIDが HTML側と合っているか確認してください
    $('#to-back').on('click', function(e) {
      e.preventDefault();
      $flipCard.addClass('is-flipped');
    });

    $('#to-front').on('click', function(e) {
      e.preventDefault();
      $flipCard.removeClass('is-flipped');
    });
  }

  // --- 4. コンタクトフォーム ---
  // (既存のバリデーションコードは非常に丁寧で素晴らしいです！)
  const $form = $('#contact-form');
  if ($form.length) {
    const $submitBtn = $('#submit-btn');
    const $emailInput = $('#email');
    const $requiredInputs = $form.find('input[required], textarea[required]');

    function isValidEmail(email) {
      const emailRegex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]\.)+[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
    }

    function validateForm() {
      let allFilled = true;
      $requiredInputs.each(function() {
        if ($(this).val().trim() === "") {
          allFilled = false;
          return false;
        }
      });
      const emailValid = isValidEmail($emailInput.val().trim());
      const canSubmit = allFilled && emailValid;
      $submitBtn.prop('disabled', !canSubmit);
    }

    $requiredInputs.on('input change', validateForm);
    validateForm();
  }
});