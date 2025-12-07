---
layout: post
title: "바이브 코딩을 위한 AI 및 IDE 선택"
date: 2025-12-07
tags: [이야기]
author: Jakemraz
image: /assets/posts/2025-12-07-choose_ide_ai/image.png
---
역시 생각만 하고 있을 때와, 시작을 하고 실행을 할 때는 다르네요.

바이브 코딩을 위한 AI 모델로 Claude를 쓰고 싶었는데 IDE에 연동하려면 무료 버전으로는 안되고 유료 버전 부터 가능하단 점을 알게 되었습니다.

이에 유료 구독을 해야 하나 고민하던 찰나에, 블랙프라이데이 세일로 [z.ai](http://z.ai) 의 GLM을 할인 중이라는 소식 확인

![z.ai 구독 요금](/assets/posts/2025-12-07-choose_ide_ai/image.png)

Claude 성능에 거의 버금가는데, 비용은 훨씬 저렴하고, 토큰은 3x 를 준다고 하니.. 깊은 고민 없이 우선 바로 결제해 버렸습니다.

레퍼럴 타고 들어가서 결제하면 10% 추가 할인이 되니 무려 연간 비용이 $22.68. 구독을 안 할 이유가 없어보이죠?

레퍼럴 링크: [https://z.ai/subscribe?ic=X1YEXT5J1R](https://z.ai/subscribe?ic=X1YEXT5J1R)

이에 [z.ai](http://z.ai) Lite Plan을 구독했고, 처음에 Cursor에 연동을 시도했으나…

![Cursor 사용 불가](/assets/posts/2025-12-07-choose_ide_ai/image%201.png)

[https://docs.z.ai/devpack/tool/cursor](https://docs.z.ai/devpack/tool/cursor)

또 다시 복병 등장.. Cursor Pro 이상만 연동이 가능… 하다니.. 더 이상 돈을 쓰고 싶지 않았기에, VSCode에 연동하기로 결정

정확하게는 VSCode 연동을 위해 Cline 플러그인을 깔고 Cline에 GLM을 연동하였습니다.

메뉴얼: [https://docs.z.ai/devpack/tool/cline](https://docs.z.ai/devpack/tool/cline)

연동은 쉽게 완료했고, 제일 처음 해볼 작업으로 블로그에 ‘이야기’ 메뉴를 만들어 보았습니다.

![버전 업 전](/assets/posts/2025-12-07-choose_ide_ai/image%202.png)

현재 메뉴가 홈/소개/프로젝트/태그 로 구성돼있는데, 소개 옆에 이야기 라는 메뉴를 넣고, 태그 중 이야기 가 포함된 글들을 출력하고자 합니다.

![Cline 사용](/assets/posts/2025-12-07-choose_ide_ai/image%203.png)

Cline의 인풋 박스에 요청을 넣었더니 자기 혼자 이것 저것 내용을 변경하기 시작합니다.

심지어 변경 후 혼자서 CLI 통해 Jekyll 을 실행 시키기 까지 하네요. (이건 좀 무섭습니다. 어떻게 해야 막을 수 있을까요?)

내용을 확인 하고 커밋/푸쉬 까지 완료했더니 이제 원하는 내용이 잘 보입니다.
![적용 후](/assets/posts/2025-12-07-choose_ide_ai/image4.png)

이제 IDE와 AI Model 까지 정해졌으니 달리는 일만 남았습니다.