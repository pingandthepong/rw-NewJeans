document.addEventListener("DOMContentLoaded", function () {
  /* in the browser environment namespace */
  const Calendar = tui.Calendar;

  const calendar = new Calendar("#calendar", {
    defaultView: "month", // 초기 보기 모드 설정
    taskView: false, // 'Milestone', 'Task' 보기 모드 사용 여부
    scheduleView: true, // 'Time', 'allday' 보기 모드 사용 여부
    template: {
      time: function (schedule) {
        return `<strong>${schedule.title}</strong> <i>${schedule.start}</i>`;
      },
    },
    month: {
      daynames: ["일", "월", "화", "수", "목", "금", "토"],
      startDayOfWeek: 1,
      narrowWeekend: false,
    },
    week: {
      daynames: ["일", "월", "화", "수", "목", "금", "토"],
      startDayOfWeek: 1,
      narrowWeekend: false,
      hourStart: 9,
      hourEnd: 21,
    },
    useFormPopup: true, // 이벤트 생성/수정 시 기본 양식 팝업을 사용할지 여부
    useDetailPopup: true, // 이벤트 클릭 시 기본 상세 팝업을 사용할지 여부
    usageStatistics: false, // 호스트 이름 수집을 허용하고 해당 정보를 Google Analytics로 보낼지 여부
  });

  // 예제 일정 추가
  calendar.createEvents([
    {
      id: "1",
      calendarId: "1",
      title: "Schedule1",
      category: "time",
      dueDateClass: "",
      start: "2024-05-17T10:30:00+09:00",
      end: "2024-05-17T17:30:00+09:00",
    },
    {
      id: "2",
      calendarId: "1",
      title: "Schedule2",
      category: "time",
      dueDateClass: "",
      start: "2024-05-27T10:30:00+09:00",
      end: "2024-05-27T17:30:00+09:00",
    },
    {
      id: "3",
      calendarId: "1",
      title: "Schedule3",
      category: "time",
      dueDateClass: "",
      start: "2024-06-17T10:30:00+09:00",
      end: "2024-06-17T17:30:00+09:00",
    },
    {
      id: "4",
      calendarId: "1",
      title: "Schedule4",
      category: "time",
      dueDateClass: "",
      start: "2024-06-27T10:30:00+09:00",
      end: "2024-06-27T17:30:00+09:00",
    },
    {
      id: "5",
      calendarId: "1",
      title: "Schedule5",
      category: "time",
      dueDateClass: "",
      start: "2024-07-17T10:30:00+09:00",
      end: "2024-07-17T17:30:00+09:00",
    },
    {
      id: "6",
      calendarId: "1",
      title: "Schedule6",
      category: "time",
      dueDateClass: "",
      start: "2024-07-27T10:30:00+09:00",
      end: "2024-07-27T17:30:00+09:00",
    },
    {
      id: "7",
      calendarId: "1",
      title: "Schedule7",
      category: "time",
      dueDateClass: "",
      start: "2024-08-17T10:30:00+09:00",
      end: "2024-08-17T17:30:00+09:00",
    },
    {
      id: "8",
      calendarId: "1",
      title: "Schedule8",
      category: "time",
      dueDateClass: "",
      start: "2024-08-27T10:30:00+09:00",
      end: "2024-08-27T17:30:00+09:00",
    },
    {
      id: "9",
      calendarId: "1",
      title: "Schedule9",
      category: "time",
      dueDateClass: "",
      start: "2024-09-17T10:30:00+09:00",
      end: "2024-09-17T17:30:00+09:00",
    },
    {
      id: "10",
      calendarId: "1",
      title: "Schedule10",
      category: "time",
      dueDateClass: "",
      start: "2024-09-27T10:30:00+09:00",
      end: "2024-09-27T17:30:00+09:00",
    },
    {
      id: "11",
      calendarId: "1",
      title: "Schedule11",
      category: "time",
      dueDateClass: "",
      start: "2024-10-17T10:30:00+09:00",
      end: "2024-10-17T17:30:00+09:00",
    },
    {
      id: "12",
      calendarId: "1",
      title: "Schedule12",
      category: "time",
      dueDateClass: "",
      start: "2024-10-27T10:30:00+09:00",
      end: "2024-10-27T17:30:00+09:00",
    },
  ]);

  let calDate = new Date();
  const monthEl = document.querySelector("#calendar-month-title");

  let thisYear = calDate.getFullYear();
  let thisMonth = calDate.getMonth() + 1;

  monthEl.innerHTML = `${thisYear}. ${thisMonth}`;

  window.movePrev = function () {
    calendar.prev();
    monthEl.innerHTML = `${thisYear}. ${(thisMonth -= 1)}`;

    if (thisMonth < 2) {
      thisMonth = 13;
      thisYear--;
    }
  };

  window.moveNext = function () {
    calendar.next();

    monthEl.innerHTML = `${thisYear}. ${(thisMonth += 1)}`;

    if (thisMonth > 11) {
      thisMonth = 0;
      thisYear++;
    }
  };

  let thisDate = calDate.getDate();
  let thisDay = calDate.getDay();
  const calDay = ["일", "월", "화", "수", "목", "금", "토"];
  thisDay = calDay[thisDay];

  let today = document.querySelector(".today");
  today.innerHTML = `${thisMonth}월 ${thisDate}일 (${thisDay}) `;
});
