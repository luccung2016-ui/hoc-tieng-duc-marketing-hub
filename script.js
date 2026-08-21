
document.addEventListener('DOMContentLoaded', () => {
  // Content angle tabs
  document.querySelectorAll('.angle-tabs').forEach(tabWrap => {
    tabWrap.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        const pillar = btn.closest('.pillar');
        tabWrap.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        pillar.querySelectorAll('.angle-panel').forEach(p => p.classList.remove('active'));
        const target = pillar.querySelector('#' + btn.dataset.target);
        if (target) target.classList.add('active');
      });
    });
  });

  // Objective filter
  const objBtns = document.querySelectorAll('.objective-tabs [data-obj]');
  objBtns.forEach(btn => btn.addEventListener('click', () => {
    objBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const obj = btn.dataset.obj;
    document.querySelectorAll('.pillar[data-objectives]').forEach(p => {
      const list = (p.dataset.objectives || '').split(/\s+/);
      p.style.display = obj === 'all' || list.includes(obj) ? '' : 'none';
    });
  }));

  // Persona modal — uses only segment information already present on the page.
  const modal = document.getElementById('personaModal');
  if (modal) {
    const title = document.getElementById('personaModalTitle');
    const body = document.getElementById('personaModalBody');
    const card = modal.querySelector('.modal-card');

  const personas={
    duhocnghe:[
      {tag:'HS–SV · 18–22 tuổi',name:'🎒 Nam — Du học nghề',insight:'“Sẵn sàng theo đuổi ngôn ngữ khó nếu thấy lộ trình đủ rõ để đi đến cùng.”',barrier:'sợ không có năng khiếu, sợ học không kịp, khó phân biệt trung tâm thực chất.',channels:['TikTok','Facebook','Facebook Groups']},
      {tag:'Đi làm · 23–35 tuổi',name:'💼 Quốc Huy — Du học nghề',insight:'“Không còn nhiều thời gian để thử và sai; nơi tôi chọn phải giúp mình duy trì việc học đến cùng.”',barrier:'lịch làm việc không ổn định, khó duy trì năng lượng sau giờ làm.',channels:['TikTok','Facebook','YouTube']}
    ],
    academic:[{tag:'HS–SV · 18–28 tuổi',name:'🎓 Minh Anh — Du học Đại học/Thạc sĩ',insight:'“Không chỉ cần một tấm bằng tiếng Đức; cần năng lực đủ để không tụt lại khi vào giảng đường.”',barrier:'lo chương trình thiên về luyện thi, khó đánh giá chiều sâu chuyên môn giáo viên.',channels:['Google Search','YouTube','Threads']}],
    working:[{tag:'Đi làm · 24–40 tuổi',name:'📈 Thu Hà — Phát triển sự nghiệp',insight:'“Không muốn học thêm một chứng chỉ; muốn tiếng Đức giúp làm việc tốt hơn.”',barrier:'nội dung phổ thông không sát công việc, khó tìm chương trình đúng ngành.',channels:['LinkedIn','Facebook','Workshop chuyên ngành']}],
    parent:[{tag:'Phụ huynh · 40–55 tuổi',name:'👩‍👧 Chị Mai — Phụ huynh học viên',insight:'“Không thể học thay con, nhưng cần biết nơi mình chọn đủ trách nhiệm để không bỏ mặc con giữa hành trình.”',barrier:'khó đánh giá chất lượng trước khi đăng ký, lo quảng cáo khác trải nghiệm thực tế.',channels:['Google Search','Website','Hội nhóm phụ huynh']}],
    b2b:[{tag:'B2B · 30–50 tuổi',name:'🏢 Anh Tuấn — Đào tạo nội bộ',insight:'“Không cần khóa học đại trà; cần đối tác hiểu mục tiêu kinh doanh và chứng minh được hiệu quả đào tạo.”',barrier:'chương trình có sẵn không phù hợp, khó đo lường hiệu quả sau đào tạo.',channels:['LinkedIn','Sự kiện DN','Đối tác giới thiệu']}]
  };
  const modal=document.getElementById('personaModal'),body=document.getElementById('personaModalBody');
  function renderPersona(key){ if(!modal||!body)return; body.innerHTML=(personas[key]||[]).map(p=>`<article class="persona-item"><span class="badge">${p.tag}</span><h4>${p.name}</h4><p><strong>Insight:</strong> ${p.insight}</p><p><strong>Rào cản:</strong> ${p.barrier}</p><div class="persona-channels">${p.channels.map(c=>`<span>${c}</span>`).join('')}</div></article>`).join(''); modal.classList.add('open');modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
  document.querySelectorAll('.persona-link').forEach(b=>b.addEventListener('click',()=>renderPersona(b.dataset.persona)));
  function close(){if(!modal)return;modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';}
  document.querySelector('.modal-close')?.addEventListener('click',close);modal?.addEventListener('click',e=>{if(e.target===modal)close()});document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
})();
