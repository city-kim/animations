const word = {
  under: {
    textArray: [ // 나타낼 텍스트 배열
      'Etiam commodo commodo lacus sed suscipit',
      'Etiam et sapien ante',
      'Praesent non leo orci',
    ],
    // 1.index에 맞는 텍스트 배열의 글자를 하나씩 출력한다
    // 2.글자 수 * 0.05 * 1000 + 2500 후에 close 함수를 실행한다
    // 3.close 함수는 duration 만큼의 지연 후 show 함수를 실행하여 반복
    show: (c) => {
      // hidden 클래스를 제거하여 초기화
      document.querySelector('.word-under').classList.remove('hidden')
      // 반복 카운터 선언
      let counter = 0
      // textArray보다 값이 작은경우만 카운터에 넣어준다
      if (c && c < word.under.textArray.length) counter = c
      // textArray의 글자를 하나씩 자른다
      const textSplit = word.under.textArray[counter].split('')
      // text를 저장해줄 그룹선언
      let wordGroup = ''
      for (const i in textSplit) {
        // textSplit의 글자를 span에 넣어서 저장한다 이때 딜레이는 글자수 * 0.05초씩 증가하고 공백은 \u00A0로 대체한다
        wordGroup += `
          <span style="animation-delay: ${i * 0.05}s"
          >
            ${textSplit[i].trim() ? textSplit[i] : '\u00A0'}
          </span>`
      }
      // 그룹을 word-under에 넣어준다
      document.querySelector('.word-under').innerHTML = wordGroup
      setTimeout(() => {
        // 글자 수 * 0.05 * 1000 + 2500 후에 카운터를 증가시켜준다
        counter++
        // 지연 종료 후 close 함수를 실행
        word.under.close(counter)
      }, textSplit.length * 0.05 * 1000 + 2000) // 텍스트 길이 + 50ms(0.05 * 1000) + 추가 2초지연
    },
    close: (c) => {
      // word-under에 hidden 클래스를 추가하여 숨긴다
      document.querySelector('.word-under').classList.add('hidden')
      setTimeout(() => {
        // duration만큼 지연 후 다음 텍스트 출력을 실행한다
        word.under.show(c)
      }, 1000)
    }
  },
  push: {
    textArray: [ // 나타낼 텍스트 배열
      ['Donec', 'tristique', 'odio'],
      ['id', 'massa', 'rutrum', 'test'],
      ['venenatis', 'laoreet'],
      ['urna', 'suscipit'],
    ],
    // 1.index에 맞는 배열의 요소를 순서대로 출력한다
    // 2.첫번째와 세번째는 opacity만 조절한다
    // 3.두번째 요소의 크기는 0에서 duration만큼 넓어진다
    // 4.요소의 크기가 100%가 되었을때 위에서 내려오는 애니메이션을 실행한다
    // 5.애니메이션이 종료되면 close 함수를 실행하여 반복
    show: (c) => {
      // hidden 클래스를 제거하여 초기화
      document.querySelector('.word-push').classList.remove('hidden')
      // 반복 카운터 선언
      let counter = 0
      // textArray보다 값이 작은경우만 카운터에 넣어준다
      if (c && c < word.push.textArray.length) counter = c
      // textArray의 글자를 하나씩 자른다
      const wordArray = word.push.textArray[counter]
      // text를 저장해줄 그룹선언
      let wordGroup = ''
      for (const i in wordArray) {
        // 짝수인경우 크기조정 홀수인경우 opacity 조정 각각 딜레이는 1.5초로 한다
        wordGroup += `
          <span class="${i%2 == 0 ? 'word-push-opacity' : 'word-push-scale'}"
            style="animation-delay: ${i * 1.5}s"
          >
            ${wordArray[i]}
          </span>`
      }
      // 그룹을 word-push에 넣어준다
      document.querySelector('.word-push').innerHTML = wordGroup
      // 생성된 scale element를 가져온다
      const scales = document.querySelectorAll('.word-push-scale')
      for (let i=0; i<scales.length; i++) {
        // scale element의 width를 저장
        const width = scales[i].offsetWidth
        // 최초에는 0으로 만들어준다
        scales[i].style.width = '0px'
        setTimeout(() => {
          // 이후 1.5초 후에 width를 원상복귀시킨다
          console.log(width)
          scales[i].style.width = width + 'px'
          // 해당 scale은 홀수에 위치하므로 그만큼 딜레이를 증가시켜준다 
        }, 1500 * (i + (i + 1)));
      }

      setTimeout(() => {
        // 글자 수 * 0.05 * 1000 + 2500 후에 카운터를 증가시켜준다
        counter++
        // 지연 종료 후 close 함수를 실행
        word.push.close(counter)
      }, wordArray.length * 1500 + 2000) // 배열의 길이 * 1.5초 + 추가 2초지연
    },
    close: (c) => {
      // word-push에 hidden 클래스를 추가하여 숨긴다
      document.querySelector('.word-push').classList.add('hidden')
      setTimeout(() => {
        // duration만큼 지연 후 다음 텍스트 출력을 실행한다
        word.push.show(c)
      }, 1000)
    }
  }
}