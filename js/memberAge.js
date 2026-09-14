const memberList = [
  {
    name: "minji",
    bDay: "2004-05-07",
    imgUrl: "./images/mainimages/member/member_minji.jpg",
  },
  {
    name: "hanni",
    bDay: "2004-10-06",
    imgUrl: "./images/mainimages/member/member_hanni.jpg",
  },
  {
    name: "daniel",
    bDay: "2005-04-11",
    imgUrl: "./images/mainimages/member/member_daniel.jpg",
  },
  {
    name: "haerin",
    bDay: "2006-05-15",
    imgUrl: "./images/mainimages/member/member_haerin.jpg",
  },
  {
    name: "hyein",
    bDay: "2008-04-21",
    imgUrl: "./images/mainimages/member/member_hyein.jpg",
  },
];

const memberListEl = document.querySelector(".member_list");

memberList.forEach((member) => {
  const age = calculateAge(member.bDay);

  const li = document.createElement("li");

  li.innerHTML = `
   <div class="img_wrap">
     <img src="${member.imgUrl}" alt="${member.name} 사진" />
   </div>
   <div class="txt_wrap">
     <p class="name">${member.name}</p>
     <p class="b_day">${age.YEAR}.${age.MONTH}.${age.DATE} (${age.age}세)</p>
   </div>
 `;

  memberListEl.appendChild(li);
});

function calculateAge(bDay) {
  // 올해 연도
  const current = new Date();
  const currentYear = current.getFullYear();

  // 생일을 Date로 변환
  const memberBirthDay = new Date(bDay);
  // Fri May 07 2004 09:00:00 GMT+0900 (한국 표준시)

  const YEAR = memberBirthDay.getFullYear();
  const MONTH = memberBirthDay.getMonth() + 1;
  const DATE = memberBirthDay.getDate();

  // 현재 만나이 계산
  const birthdayThisYear = new Date(currentYear, MONTH - 1, DATE);

  let age = currentYear - YEAR;

  if (current < birthdayThisYear) {
    age--;
  }

  return { currentYear, YEAR, MONTH, DATE, age };
}
