// // split("") = 한글자씩 배열로 담음
// // 단어 단위로 담으려면 split(" ")

// const content = "NewJeans = Jeans + New Generation".split("");
// let typingIdx = 0;
// let clear1;
// const delayTime = 2000;

// function typing() {
//   if (typingIdx < content.length) {
//     $(".member .description .sub_title").append(content[typingIdx]);
//     typingIdx++;
//   } else {
//     // 타이핑 완료 후 지연 시간 동안 대기
//     // setTimeout(() => {
//     //   $(".member .description .sub_title").empty();
//     //   typingIdx = 0;
//     // }, delayTime);

//     // 방법1 clearInterval : 한번 모두 타이핑 처리 후 멈춤
//     // clearInterval(clear1);

//     // 방법2 : loop
//     $(".member .description .sub_title").empty();
//     typingIdx = 0;
//   }
//   }
// }

// clear1 = setInterval(typing, 100);
