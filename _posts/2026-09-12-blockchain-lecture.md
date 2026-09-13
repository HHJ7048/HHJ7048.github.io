---
title: 2026 Block Chain Meetup Day
date: 2026-09-12 21:00:00 +0900
categories: [기타]
tags: [블록체인]
---

![image](/assets/img/2026-09-12-blockchain-lecture/01.png)

> **2026-09-12 · 대구 디지털혁신진흥원**
> 「스마트 컨트랙트 구현을 통한 분산 어플리케이션(DApp) 개발」
> 강사: 박상현 (서울대 가상머신및최적화연구실 / 前 KakaoBrain Research, CPLABS Research)

블록체인 이론 → 솔리디티 문법·보안·가스 최적화 → 스마트 컨트랙트 개발과 테스트 → DApp 프론트엔드 연동과 지갑 UX까지 이어지는 4차시 과정.

실제로 운영 중인 컨트랙트(ERC20, Uniswap V2, Governor/Timelock)를 직접 읽어보는 파트가 있어서 이론에서 실무 영역까지 확장해준다.

## 1. 블록체인을 다각도로 보기

Data / Network / Fault Tolerance / Money / Governance 다섯 관점에서 블록체인의 핵심과 특징을 짚어준다.

**블록체인이란? : "참여자가 서로 완전히 신뢰하지 않아도 같은 상태를 유지하려는 공유 상태 머신"**.

- **Data** — 단순히 데이터를 공유하는 데 그치지 않고, 무엇이 유효한지 함께 검증하고 변경 이력을 공통 원장으로 유지한다
- **Network** — P2P 그 자체가 아니라, P2P 위에 합의 규칙과 경제 인센티브를 올린 또 다른 시스템
- **Fault Tolerance** — 단순히 노드가 멈추는 수준이 아니라 잘못된 메시지와 악의적 행동(Byzantine)까지 상정한다
- **Money** — 출발점은 이중지불 문제. "권위 있는 장부를 중앙기관 없이 만들 수 있는가?"
- **Governance** — code-is-law의 한계. 버그·업그레이드·정책 변경에는 결국 의사결정 체계가 필요하다

### 기억에 남은 포인트

1. 블록체인은 완벽한 보안 알고리즘이 아니다. 다만 **신뢰가 없는 환경에서 완벽에 가까운 보안**을 만들어준다.
2. 요즘 블록체인을 이용한 투표에 관심이 많은데, 강사는 아직 이르다고 본다. 지금 블록체인으로 퍼블릭에 데이터를 올리면, 나중에 그 암호화를 풀 수 있게 되었을 때 기록된 정보가 그대로 노출될 수 있기 때문이다.
3. 트레이드 오프와 오버헤드가 분명히 있으므로, 정말 필요한 경우인지 잘 판단해서 사용해야 한다.

> 보안성 = 합의 알고리즘 + 네트워크 가정 + 경제 가정
> 이성적 참여자, 궁극적 동기화, 담합 제한, 충분한 정직한 참여 — 이 가정 중 하나라도 깨지면 프로토콜도 위험해진다.

### 한계 — 블록체인이 완벽하진 않다.

- **확장성·저장 비용** — 원장과 상태가 커질수록 동기화·검증·저장 부담이 커진다
- **오라클 문제** — 온체인 밖 데이터를 들여올 때는 추가적인 신뢰 장치가 필요하다
- **거버넌스 마찰** — 버그 수정과 업그레이드는 사회적 합의와 포크 문제를 동반한다
- **비용·UX** — 수수료, 지연, 지갑/키 관리 같은 사용성 장벽이 남는다

### 어떠한 경우에 블록체인을 사용해야 할까?

![image](/assets/img/2026-09-12-blockchain-lecture/02.png)

네 가지 질문으로 판단한다.

1. 여러 주체가 같은 상태를 함께 쓰고 바꿔야 하는가?
2. 그 주체들이 서로를 충분히 신뢰하지 않는가?
3. 온라인 신뢰 중개자 하나에 모두 의존하기 어려운가?
4. 검열 저항성·중립성·공개 검증이 중요한가?

하나라도 NO면 중앙 DB나 공유 DB가 낫다. 단일 사업자가 통제하는 앱, 초고속 내부 처리 시스템, 대량의 비공개 가변 데이터가 핵심인 경우가 대표적이다.

블록체인은 트레이드 오프가 있는 메커니즘이기에 필요한 환경에서만 사용해야 한다.

> 중요한 질문은 "좋은 기술인가?"가 아니라 **"내 문제에 맞는 기술인가?"**

## 2. 이더리움과 EVM

비트코인과 가장 다른 점은 **Smart Contract가 지원된다**는 것이다.

비트코인은 코드 배포에 제한이 있었지만, 이더리움은 자유롭게 코드를 배포할 수 있다.

다만 완전한 자유는 아니고, 연산량을 **GAS**로 측정해 금액을 매긴다. 덕분에 무한루프 같은 DoS 공격을 비용으로 방어할 수 있다.

- **EOA (Externally Owned Account)** — 개인키로 제어되는 계정. 트랜잭션을 시작할 수 있다
- **CA (Contract Account)** — 코드가 있는 계정. 호출을 받아 로직을 실행한다
- 대표 트랜잭션 3종 — ETH 전송 / 컨트랙트 배포 / 함수 호출
- 가스는 단순 수수료가 아니라 자원 가격표다. **연산보다 스토리지 쓰기가 훨씬 비싸다**

### EVM

![image](/assets/img/2026-09-12-blockchain-lecture/03.png)

모든 노드가 같은 입력으로 같은 결과를 내야 하므로, EVM은 결정적이고 샌드박스된 환경으로 설계됐다. 기본적으로 파일 시스템이나 외부 네트워크에 직접 접근하지 않는다.

Calldata(함수 입력) → Stack(계산용 임시 공간) / Memory(호출 단위 휘발성) / Storage(영구 상태, 비용 큼) → State change, 그리고 Logs·Return Data로 이벤트와 반환값을 남긴다.

### 스마트 컨트랙트와 DApp

작성(Solidity) → 컴파일(EVM bytecode) → 배포(contract address) → 호출(function call) → 상태 변경(storage + event).

DApp은 핵심 로직을 컨트랙트에 두는 스택이고, 실제 서비스 대부분은 오프체인과 결합한 하이브리드다. 중요한 건 완전한 탈중앙화가 아니라 **어느 부분을 신뢰하고 무엇을 검증 가능하게 만들 것인지**다.

> **DApp과 솔리디티 개발의 핵심은 보안·비용·UX의 균형이다.**

## 3. 솔리디티 개발

### 가스 비용은 누가 부담하나

런타임 가스 비용에는 두 가지 측면이 있다.

- 사용한 사람이 가스를 전부 부담한다 — 블록체인 철학에 더 맞는 방향
- 작성한 사람이 가스비에 책임을 지게 한다

### 배포 전략

- 여러 번 호출되는 컨트랙트 — 배포에 가스를 많이 쓰더라도 실행을 최적화한다 (optimizer `runs` ↑)
- 한두 번만 쓰이는 컨트랙트 — 배포 자체와 실행에 드는 가스를 적당히 맞춘다

### 한계 — 공개되는 건 소스코드가 아니라 바이트코드

체인에 올라가는 것은 기계어 코드이고, 실제 소스코드는 깃허브 같은 곳에서 따로 확인해야 한다.

그래서 **잘 모르고 실행시키면 굉장히 위험할 수 있다.** 디컴파일은 매우 힘들기 때문에 원래 코드로 되돌리기도 어렵다.

### Etherscan

<https://etherscan.io/>

![image](/assets/img/2026-09-12-blockchain-lecture/04.png)

어떤 블록들이 쌓여 있는지, 그 정보를 확인할 수 있는 사이트.

블록 안의 트랜잭션, 호출 함수, 인자 등이 적혀 있고 바이트코드도 확인할 수 있다.

소스코드가 올라온 경우도 있고 없는 경우도 있는데, 없으면 기계어로 1대1 매핑을 시켜볼 수는 있지만 정확한 정보를 표현해주지는 않는다.

### 코드 기본 구조

![image](/assets/img/2026-09-12-blockchain-lecture/05.png)

- 솔리디티는 아직 개발 중인 언어라서 **버전이 달라지면 보안 레벨과 문법이 많이 달라진다.** `pragma`로 컴파일러 범위를 고정해 팀·CI·감사 환경에서 같은 결과를 재현해야 한다
- 솔리디티는 기본값으로 **오버플로우 검사**를 해준다 (해킹 위험 중 대부분이 오버플로우). 따라서 연산량을 기본적으로 어느 정도 먹고 들어가고, 이걸 빼고 싶으면 `unchecked`로 따로 명시해줘야 한다
- 파일 레이아웃: SPDX 라이선스 → pragma → import → NatSpec → contract(state / event / error / modifier / function)
- **storage · memory · calldata** — storage는 영구 저장소라 읽기·쓰기가 모두 비싸고, memory는 호출 동안만 유지되는 임시 공간, calldata는 external 함수 인자용 read-only 영역이라 복사를 피할 수 있어 고효율이다
- 가시성(`public` / `internal` / `private`)은 **인터페이스 제어일 뿐 온체인 데이터를 비밀로 만들어주지 않는다**

[Remix IDE](https://remix.ethereum.org/) — 웹브라우저에서 바로 개발할 수 있는 이더리움 개발환경

### 실습 — 가스 비용 직접 재보기

Remix에서 같은 결과를 내는 두 함수의 transaction cost를 비교해보는 실습.

- **memory vs calldata** — external 함수가 큰 배열을 읽기만 한다면 `calldata`가 ABI→memory 복사를 피해서 더 싸다
- **storage 반복 읽기 vs 캐시** — 루프 안에서 상태 변수를 매번 읽지 말고 지역 변수에 캐시한다
- **length 캐시 + unchecked 증가** — `arr.length`를 캐시하고, 범위가 증명되는 hot loop에서만 `unchecked { ++i; }`
- optimizer의 `runs` 값은 배포 비용과 런타임 비용 사이의 trade-off다. 무조건 큰 값이 정답은 아니고 hot path를 먼저 측정해야 한다

![image](/assets/img/2026-09-12-blockchain-lecture/06.png)

![image](/assets/img/2026-09-12-blockchain-lecture/07.png)

![image](/assets/img/2026-09-12-blockchain-lecture/08.png)

![image](/assets/img/2026-09-12-blockchain-lecture/09.png)

## 4. 솔리디티 대표 취약 패턴

보안 문제는 보통 "문법을 몰라서"가 아니라 **외부와 만나는 지점이 어디인지 몰라서** 생긴다.

리뷰를 시작할 때 먼저 보는 5가지 — 권한(누가 이 함수를 호출할 수 있나), 외부 호출(CALL 이후 재진입 가능한가), 값 흐름(ETH/토큰 accounting이 맞는가), 업그레이드(proxy·delegatecall·storage layout), 가스/루프(block gas limit에 막히지 않는가).

### 재진입 (Reentrancy) — The DAO가 남긴 교훈

외부 CALL이 state update보다 먼저 일어나면, 상대 컨트랙트가 `fallback`/`receive`에서 다시 들어올 수 있다.

**Checks–Effects–Interactions** 순서로 상태를 먼저 바꾸고 전송을 마지막에 둔다.

![image](/assets/img/2026-09-12-blockchain-lecture/10.png)

![image](/assets/img/2026-09-12-blockchain-lecture/11.png)

### 권한 설계와 초기화 실수

- `init()`을 `public`으로 열어두면 소유권 탈취로 직결된다. proxy 환경에서는 constructor가 실행되지 않으므로 `initializer` 패턴 + 재호출 방지 guard가 필수
- `onlyOwner` 하나로 모든 기능을 묶지 말고 역할 분리 / multisig / pause 권한을 나눠서 설계한다
- `private`은 비밀이 아니라 인터페이스 제한일 뿐이다

> 실제로 권한 설계·초기화 실수로 이더가 묶여 있고, 아직도 복구하지 못한 사용자들이 존재한다.

![image](/assets/img/2026-09-12-blockchain-lecture/12.png)

### 산술 / 오버플로우

0.8 이하 버전을 사용할 경우에는 오버플로우를 체크하는 코드가 필요하고, 반대로 체크가 필요 없는 경우에는 가스비 측면에서 명시적으로 빼주는 것이 효율적이다.

0.8+ 는 기본이 checked라 SafeMath가 대부분 불필요하지만, `unchecked`를 쓰면 다시 wrapping arithmetic으로 돌아가므로 범위가 증명되는 구간에만 쓴다.

### ETH 수신과 balance

`payable`은 ETH를 받아오는 방법인데, 실제로는 **non-payable이 가스비를 덜 쓰는 게 아니라 오히려 ETH가 있는지 없는지 확인하는 과정에서 더 많은 가스비를 소모한다.**

또 강제 전송이나 selfdestruct 때문에 `address(this).balance`와 내부 accounting 변수는 어긋날 수 있다. 잔고보다 내부 accounting state를 신뢰할 것.

![image](/assets/img/2026-09-12-blockchain-lecture/13.png)

### 가스 최적화 — 효과가 잘 보이는 패턴

강의에서 가스비를 아낄 수 있는 여러 팁을 나열해준다.

1. **calldata** — external 함수의 큰 배열/struct 인자는 복사를 피한다
2. **constant / immutable** — storage slot을 덜 사용한다
3. **custom errors** — 문자열 revert보다 가스도 싸고 디버깅 경험도 낫다
4. **cache reads** — 반복해서 읽는 storage 값은 지역 변수에 캐시한다
5. **storage packing** — 작은 value type을 묶어 32-byte slot 낭비를 줄인다 (선언 순서가 달라지면 slot 수가 늘 수 있음)

> 우선순위는 **Correctness > Security > Readability > Gas**.
> 가독성을 크게 해치는 트릭은 숫자로 증명되기 전까지 보류한다.

## 5. 실제 스마트 컨트랙트 개발 환경

- **Hardhat** — 보통 개발환경은 Hardhat을 주로 사용한다. 컴파일·테스트·배포·verify를 한 워크플로우로 관리한다 (`contracts/`, `test/`, `scripts/`, `ignition/`, `hardhat.config.ts`)
- **Ethers.js** — Provider(읽기 전용 조회) / Signer(서명·상태 변경) / Contract(ABI + 주소)로 역할을 나눠서 보면 프론트엔드와 배포 스크립트가 단순해진다
- [**OpenZeppelin Wizard**](https://wizard.openzeppelin.com/) — 기존에 잘 만들어진 구현체들을 그대로 가져다 사용할 수 있다. ERC20/721, Ownable, AccessControl, ReentrancyGuard, Pausable, Governor 등. 직접 구현보다 import가 안전하다
- **Chainlink** — 외부 데이터를 끌어다 쓸 수 있는 서비스(Data Feeds, VRF, Automation). 비용이 발생하기 때문에 "이런 서비스가 있다"를 알아두고 필요할 때 활용하면 좋다
- **테스트** — 기능 확인이 아니라 **실패 조건까지 모델링**하는 작업이다. 정상 동작 / 권한·revert / 이벤트·잔액 변화 / 외부 의존성 mock 네 축으로 본다

## 6. Real-World Contract 사용 사례

![image](/assets/img/2026-09-12-blockchain-lecture/14.png)

![image](/assets/img/2026-09-12-blockchain-lecture/15.png)

![image](/assets/img/2026-09-12-blockchain-lecture/16.png)

세 사례 모두 함수 한 줄보다 **"어떤 운영 리스크를 막기 위해 여기까지 왔는가"** 를 보는 게 핵심이다.

- **ERC20** — 인터페이스(IERC20) / 실제 공급은 `_mint`·`_burn` / allowance UX는 permit으로 1-step 승인 / v5는 `_update` 중심 커스터마이즈
- **Uniswap V2** — Factory, Pair(reserve·swap·invariant·reentrancy lock), LP 토큰, permit. 상태 보관 + 안전장치 + UX용 서명 로직이 한 컨트랙트에 다 들어있다
- **Governance + Timelock** — 투표권 snapshot으로 과거 블록 기준 권한을 고정하고, 실행 지연으로 admin risk를 완화한다. 운영 프로세스까지 코드로 드러내는 사례

ABI를 이용해서 그 함수의 입출력값과 같은 정보를 알아낼 수 있다.

## 7. 지갑 UX와 계정 추상화

### 실제 지갑의 문제점

1. 지갑을 사용하면 MetaMask가 서명, 인증 등 중요한 기능을 담당한다
2. 그런데 이런 기능을 쓰려면 MetaMask를 다운로드 받아야 하고, 가스비도 직접 준비해야 해서 방법부터 번거로워진다
3. 그래서 이걸 대리해주는 방법들이 제시됐는데, 그러면 블록체인의 특징이 아닌 중앙화가 되어버린다
4. 그래서 대리는 해주되 중간에서 간섭하지는 못하게 하는 **대납(gas sponsorship)** 시스템이 나타났다

### ERC-4337

![image](/assets/img/2026-09-12-blockchain-lecture/17.png)

트랜잭션 대신 **UserOperation** 객체를 만들어 Bundler → EntryPoint → (선택적으로) Paymaster를 거치게 하는 구조. 프로토콜을 바꾸지 않고도 스마트 계정 UX를 구현할 수 있다.

하지만 이런 방식을 사용하면 오버헤드가 조금 발생해서 **비용이 조금 더 비싸진다.** 그리고 악의적인 행동은 하지 못하지만 **검열은 가능하다.** 그래도 편리성을 위해 이 정도 단점은 그냥 감수하고 사용되고 있다.

### EIP-7702

![image](/assets/img/2026-09-12-blockchain-lecture/18.png)

4337과 다르게 **원래 가지고 있던 계정(EOA)에 코드를 끼워 넣어** 스마트 계정처럼 사용할 수 있게 해주는 방식으로 동작한다 (25년도부터 사용되기 시작).

새 주소로 이사하지 않고도 batching·스폰서십·복구 UX를 열어준다는 게 핵심.

하지만 7702로 끼워 넣은 코드의 위험성을 잘 판단하지 못하면 피해를 입을 수도 있다. 그래서 실제 지갑 업체 서비스에서는 7702를 굉장히 제한된 환경에서만 쓸 수 있게 하거나, 아예 제공하지 않는 곳도 있다.

#### ERC-4337 vs EIP-7702 — 경쟁이 아니라 조합 가능한 옵션

| 구분 | ERC-4337 | EIP-7702 |
| --- | --- | --- |
| 핵심 대상 | 스마트 계정 | 기존 EOA |
| 주요 객체 | UserOperation + EntryPoint | authorization list + type 4 tx |
| 프로토콜 변경 | 불필요 | 필요 (Pectra) |
| 도입 방식 | wallet / bundler / paymaster 스택 도입 | 기존 주소 유지한 점진적 업그레이드 |
| 잘 맞는 상황 | 성숙한 smart account UX | 기존 EOA UX 개선 |

## 정리

1. 이번 강의에서 BlockChain과 이더리움의 가장 기본적인 개념이 아닌 도메인 관점에서 보는 다양한 시각과 실습(최적화, 보안 측면)에서 바라보고 또 나아가서 개발 환경, 실제 도구 사용 실습, 배포 까지 중요하고 필요한 넓은 지식을 빠르고 효과적으로 얻을 수 있었다.
2. 기존 개념으로만 알고있던 이더리움을 직접 실행해보고 공부해볼 수 있는 환경을 열어준 강의로써 의미가 있었다.
3. 1시간 마다 Q&A를 받았는데, 이 부분에서도 다양한 도메인(보안, 데이터, 금융, NFT 서비스 개발, 시스템 개선(투표) 등)에서 블록 체인을 활용할 수 있는 사례들과 그에 대한 피드백이 도움이 많이 된 것 같다. 나도 LLM분야에서 활용할 수 있다면 이번 강의 내용을 기반으로 블록체인 시스템을 적극 융합해 보겠다.
하지만 강의에서 말했듯 오버헤드 트레이드오프 문제를 일으킬 수 있으므로 정말 이 기술이 활용될 수 있는 접점을 잘 찾아보아야 할 것 같다.

![image](/assets/img/2026-09-12-blockchain-lecture/19.jpg)
