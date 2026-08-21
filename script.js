
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

    const personaMap = {
      duhocnghe: [
        {name:'Học sinh / Sinh viên định hướng Du học nghề Đức', desc:'Cần đạt năng lực tiếng Đức đủ cho đầu vào, phỏng vấn và quá trình học/làm việc tại Đức.', meta:['Core Audience','Du học nghề','B1/B2']},
        {name:'Người đi làm chuyển hướng sang Du học nghề Đức', desc:'Cần một lộ trình rõ, tiến độ phù hợp và tiếng Đức đủ để bước vào môi trường Ausbildung.', meta:['Core Audience','Chuyển hướng nghề nghiệp','Ausbildung']}
      ],
      academic: [
        {name:'Người định hướng Du học Đại học / Thạc sĩ', desc:'Cần đạt năng lực và chứng chỉ tiếng Đức cần thiết cho học tập, seminar, tài liệu học thuật và môi trường đại học tại Đức.', meta:['Core Audience','Đại học / Thạc sĩ','Học thuật']}
      ],
      working: [
        {name:'Người đi làm cần tiếng Đức cho công việc', desc:'Cần tiếng Đức để phục vụ công việc, phỏng vấn, giao tiếp công sở và phát triển nghề nghiệp.', meta:['Growth Audience','Người đi làm','Công việc']}
      ],
      parent: [
        {name:'Phụ huynh / Người đồng quyết định B2C', desc:'Quan tâm độ tin cậy của trung tâm, lộ trình, tiến độ học và cơ chế hỗ trợ để giảm rủi ro khi quyết định cho con học.', meta:['Buying Group','Phụ huynh','B2C']}
      ],
      b2b: [
        {name:'Chủ doanh nghiệp / HR / L&D', desc:'Quan tâm nhu cầu đào tạo, khả năng thiết kế chương trình, theo dõi tiến độ và đo lường hiệu quả đào tạo.', meta:['Buying Group','B2B','HR / L&D']}
      ]
    };

    function openPersona(key){
      const items = personaMap[key] || [];
      const trigger = document.querySelector(`[data-persona="${key}"]`);
      const hostCard = trigger?.closest('.audience-card');
      title.textContent = hostCard ? 'Chân dung khách hàng · ' + hostCard.querySelector('h3').textContent : 'Chân dung khách hàng';
      body.innerHTML = items.map(x => `
        <article class="persona-card">
          <h4>${x.name}</h4>
          <p>${x.desc}</p>
          <div class="persona-meta">${x.meta.map(m=>`<span>${m}</span>`).join('')}</div>
        </article>`).join('');
      body.classList.toggle('single', items.length === 1);
      card.classList.toggle('single', items.length === 1);
      modal.classList.add('open');
      modal.setAttribute('aria-hidden','false');
      document.body.style.overflow='hidden';
    }
    function closePersona(){
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden','true');
      document.body.style.overflow='';
    }
    document.querySelectorAll('.persona-link').forEach(btn => btn.addEventListener('click', () => openPersona(btn.dataset.persona)));
    modal.querySelector('.modal-close')?.addEventListener('click', closePersona);
    modal.addEventListener('click', e => { if(e.target === modal) closePersona(); });
    document.addEventListener('keydown', e => { if(e.key === 'Escape' && modal.classList.contains('open')) closePersona(); });
  }
});
