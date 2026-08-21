
document.addEventListener('DOMContentLoaded', () => {

  /* ======================================================
     1. CONTENT ANGLE TABS
  ====================================================== */
  document.querySelectorAll('.angle-tabs').forEach(tabWrap => {
    tabWrap.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        const pillar = btn.closest('.pillar');
        if (!pillar) return;

        tabWrap.querySelectorAll('button').forEach(b => {
          b.classList.remove('active');
        });

        btn.classList.add('active');

        pillar.querySelectorAll('.angle-panel').forEach(panel => {
          panel.classList.remove('active');
        });

        const targetId = btn.dataset.target;
        const target = targetId
          ? pillar.querySelector('#' + targetId)
          : null;

        if (target) {
          target.classList.add('active');
        }
      });
    });
  });


  /* ======================================================
     2. OBJECTIVE FILTER
  ====================================================== */
  const objBtns = document.querySelectorAll(
    '.objective-tabs [data-obj]'
  );

  objBtns.forEach(btn => {
    btn.addEventListener('click', () => {

      objBtns.forEach(b => {
        b.classList.remove('active');
      });

      btn.classList.add('active');

      const obj = btn.dataset.obj;

      document
        .querySelectorAll('.pillar[data-objectives]')
        .forEach(pillar => {

          const objectives = (
            pillar.dataset.objectives || ''
          ).split(/\s+/);

          if (obj === 'all' || objectives.includes(obj)) {
            pillar.style.display = '';
          } else {
            pillar.style.display = 'none';
          }
        });
    });
  });


  /* ======================================================
     3. PERSONA DATA
  ====================================================== */

  const personas = {

    duhocnghe: [
      {
        tag: 'HS–SV · 18–22 tuổi',
        name: '🎒 Nam — Du học nghề',

        insight:
          '“Sẵn sàng theo đuổi ngôn ngữ khó nếu thấy lộ trình đủ rõ để đi đến cùng.”',

        barrier:
          'Sợ không có năng khiếu, sợ học không kịp, khó phân biệt trung tâm thực chất.',

        channels: [
          'TikTok',
          'Facebook',
          'Facebook Groups'
        ]
      },

      {
        tag: 'Đi làm · 23–35 tuổi',
        name: '💼 Quốc Huy — Du học nghề',

        insight:
          '“Không còn nhiều thời gian để thử và sai; nơi tôi chọn phải giúp mình duy trì việc học đến cùng.”',

        barrier:
          'Lịch làm việc không ổn định, khó duy trì năng lượng sau giờ làm.',

        channels: [
          'TikTok',
          'Facebook',
          'YouTube'
        ]
      }
    ],


    academic: [
      {
        tag: 'HS–SV · 18–28 tuổi',

        name:
          '🎓 Minh Anh — Du học Đại học/Thạc sĩ',

        insight:
          '“Không chỉ cần một tấm bằng tiếng Đức; cần năng lực đủ để không tụt lại khi vào giảng đường.”',

        barrier:
          'Lo chương trình thiên về luyện thi, khó đánh giá chiều sâu chuyên môn giáo viên.',

        channels: [
          'Google Search',
          'YouTube',
          'Threads'
        ]
      }
    ],


    working: [
      {
        tag: 'Đi làm · 24–40 tuổi',

        name:
          '📈 Thu Hà — Phát triển sự nghiệp',

        insight:
          '“Không muốn học thêm một chứng chỉ; muốn tiếng Đức giúp làm việc tốt hơn.”',

        barrier:
          'Nội dung phổ thông không sát công việc, khó tìm chương trình đúng ngành.',

        channels: [
          'LinkedIn',
          'Facebook',
          'Workshop chuyên ngành'
        ]
      }
    ],


    parent: [
      {
        tag: 'Phụ huynh · 40–55 tuổi',

        name:
          '👩‍👧 Chị Mai — Phụ huynh học viên',

        insight:
          '“Không thể học thay con, nhưng cần biết nơi mình chọn đủ trách nhiệm để không bỏ mặc con giữa hành trình.”',

        barrier:
          'Khó đánh giá chất lượng trước khi đăng ký, lo quảng cáo khác trải nghiệm thực tế.',

        channels: [
          'Google Search',
          'Website',
          'Hội nhóm phụ huynh'
        ]
      }
    ],


    b2b: [
      {
        tag: 'B2B · 30–50 tuổi',

        name:
          '🏢 Anh Tuấn — Đào tạo nội bộ',

        insight:
          '“Không cần khóa học đại trà; cần đối tác hiểu mục tiêu kinh doanh và chứng minh được hiệu quả đào tạo.”',

        barrier:
          'Chương trình có sẵn không phù hợp, khó đo lường hiệu quả sau đào tạo.',

        channels: [
          'LinkedIn',
          'Sự kiện DN',
          'Đối tác giới thiệu'
        ]
      }
    ]
  };


  /* ======================================================
     4. PERSONA MODAL
  ====================================================== */

  const modal =
    document.getElementById('personaModal');

  const modalBody =
    document.getElementById('personaModalBody');

  const modalTitle =
    document.getElementById('personaModalTitle');

  const modalCard =
    modal?.querySelector('.modal-card');


  function renderPersona(key) {

    if (!modal || !modalBody) return;

    const items = personas[key] || [];

    if (!items.length) {
      console.warn(
        'Không tìm thấy persona:',
        key
      );

      return;
    }


    /* -----------------------------------
       Modal title
    ----------------------------------- */

    const trigger =
      document.querySelector(
        `.persona-link[data-persona="${key}"]`
      );

    const audienceCard =
      trigger?.closest('.audience-card');

    const audienceName =
      audienceCard
        ?.querySelector('h3')
        ?.textContent
        ?.trim();

    if (modalTitle) {

      modalTitle.textContent =
        audienceName
          ? `Chân dung khách hàng · ${audienceName}`
          : 'Chân dung khách hàng';
    }


    /* -----------------------------------
       Persona cards
    ----------------------------------- */

    modalBody.innerHTML = items
      .map(persona => {

        const channels =
          persona.channels
            .map(
              channel =>
                `<span>${channel}</span>`
            )
            .join('');


        return `

          <article class="persona-item">

            <span class="badge">
              ${persona.tag}
            </span>

            <h4>
              ${persona.name}
            </h4>

            <p>
              <strong>Insight:</strong>
              ${persona.insight}
            </p>

            <p>
              <strong>Rào cản:</strong>
              ${persona.barrier}
            </p>

            <div class="persona-channels">

              ${channels}

            </div>

          </article>

        `;
      })
      .join('');


    /* -----------------------------------
       Tự động co modal nếu chỉ có 1 persona
    ----------------------------------- */

    const isSingle =
      items.length === 1;

    modalBody.classList.toggle(
      'single',
      isSingle
    );

    modalCard?.classList.toggle(
      'single',
      isSingle
    );


    /* -----------------------------------
       Open
    ----------------------------------- */

    modal.classList.add('open');

    modal.setAttribute(
      'aria-hidden',
      'false'
    );

    document.body.style.overflow =
      'hidden';
  }


  function closePersonaModal() {

    if (!modal) return;

    modal.classList.remove('open');

    modal.setAttribute(
      'aria-hidden',
      'true'
    );

    document.body.style.overflow = '';
  }


  /* ======================================================
     5. OPEN PERSONA MODAL
  ====================================================== */

  document
    .querySelectorAll('.persona-link')
    .forEach(btn => {

      btn.addEventListener(
        'click',
        event => {

          event.preventDefault();

          event.stopPropagation();

          const key =
            btn.dataset.persona;

          if (!key) return;

          renderPersona(key);
        }
      );
    });


  /* ======================================================
     6. CLOSE PERSONA MODAL
  ====================================================== */

  document
    .querySelector('.modal-close')
    ?.addEventListener(
      'click',
      closePersonaModal
    );


  modal?.addEventListener(
    'click',
    event => {

      if (event.target === modal) {
        closePersonaModal();
      }
    }
  );


  document.addEventListener(
    'keydown',
    event => {

      if (
        event.key === 'Escape' &&
        modal?.classList.contains('open')
      ) {

        closePersonaModal();
      }
    }
  );

});
