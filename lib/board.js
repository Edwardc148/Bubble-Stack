// import COLOR from './colors';
// import _ from 'lodash';
//
// function generateInitialBoard() {
//   let allBubbles = [];
//   let xDistance;
//   let yDistance;
//   let evenInitialOffset = 20;
//   let offSet = 20;
//
//   for (let i = 0; i < 20; i++) {
//     allBubbles[i] = [];
//     for (let j = 0; j < 20; j++) {
//       if (i%2===0) {
//         xDistance = (40*j)+evenInitialOffset+offSet;
//       } else {
//         xDistance = (40*j)+offSet;
//       }
//
//       yDistance = (34*i)+offSet;
//
//       allBubbles[i][j] = {
//         x: xDistance,
//         y: yDistance,
//         color: _.sample(COLOR),
//         display: 0,
//         match: 0
//       };
//     }
//   }
//
//   for (let i = 0; i < 3; i++) {
//     for (let j = 4; j < 9; j++) {
//       allBubbles[i][j].display = 1;
//     }
//   }
// }
//
// export default generateInitialBoard;
