/* 手机端底部导航补全：源码里前三个按钮没绑事件，这里补上 */
(function () {
  var bound = false;

  function bind() {
    var nav = document.querySelector('.mobile-nav');
    if (!nav) return;
    var items = nav.querySelectorAll('taro-view-core, view');
    if (items.length < 4) return;

    // 避免重复绑定
    if (nav.getAttribute('data-fixed') === '1') return;
    nav.setAttribute('data-fixed', '1');

    // 1. 工作台：回到顶部
    items[0].style.cursor = 'pointer';
    items[0].addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 2. 患儿：滚动到患者卡片（当前手机端患者列表在侧栏，先定位到患者信息卡）
    items[1].style.cursor = 'pointer';
    items[1].addEventListener('click', function () {
      var card = document.querySelector('.patient-card');
      if (card) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 3. 食谱：跳到调整方案页
    items[2].style.cursor = 'pointer';
    items[2].addEventListener('click', function () {
      window.location.hash = '#/pages/adjust/index';
    });

    bound = true;
  }

  function tryBind() {
    bind();
    setTimeout(tryBind, 1500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryBind);
  } else {
    tryBind();
  }
})();
