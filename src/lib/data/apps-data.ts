/**
 * アプリ紹介ページのデータ定義
 */

export interface AppSlide {
  imageUrl: string;
  altText: string;
}

export interface App {
  id: string;
  name: string;
  description: string;
  catchphrase: string;
  detailedDescription?: string;
  features?: string[];
  slides: AppSlide[];
}

/**
 * アプリ紹介データ
 */
export const APPS_DATA: App[] = [
  {
    "id": "google-post-app",
    "name": "Google画像自動投稿アプリ",
    "description": "HotPepper Beautyのスタイル画像をGoogleマップに自動投稿。HPB更新だけで集客を最大化します。",
    "catchphrase": "HPB更新だけで、Googleマップも育つ",
    "detailedDescription": "サロンオーナー様が抱える「HotPepper Beautyの更新で手一杯で、Googleマップの古い写真が放置されている」という課題を解決します。このアプリを使えば、HPBのスタイル画像を簡単な3ステップ操作でGoogleマップに自動投稿。新規顧客獲得コストをかけずに来店数を純増させ、常に最新の情報でブランドイメージを向上させることが可能です。「二重投稿」の手間をゼロにし、本来のサロンワークに集中できます。",
    "features": [
      "マップでの「発見されやすさ」を実現 (MEO対策)",
      "お客様の「来店確度」が上がる",
      "面倒な「二重投稿」の手間がゼロに"
    ],
    "slides": [
      {
        "imageUrl": "/images/apps/google-post-app/slide-1.png",
        "altText": "Google画像自動投稿アプリのタイトルページ。HPB更新だけでGoogleマップも育つ新しい集客習慣を提案し、来店数純増とブランドイメージ向上を謳っています。"
      },
      {
        "imageUrl": "/images/apps/google-post-app/slide-2.png",
        "altText": "サロンオーナーが抱える課題を提示。HotPepper Beautyの更新で手一杯で、Googleマップの更新まで手が回らない現状を描写しています。"
      },
      {
        "imageUrl": "/images/apps/google-post-app/slide-3.png",
        "altText": "アプリがもたらす3つのベネフィットを紹介。1.マップでの発見されやすさ実現(MEO対策)。2.お客様の来店確度向上。3.面倒な二重投稿の手間がゼロに。"
      },
      {
        "imageUrl": "/images/apps/google-post-app/slide-4.png",
        "altText": "専門知識不要の簡単な3ステップ操作を説明。STEP1: HotPepper BeautyのURL入力、STEP2: 投稿する画像を選択、STEP3: 『投稿ボタン』を押すだけ。"
      },
      {
        "imageUrl": "/images/apps/google-post-app/slide-5.png",
        "altText": "利用者の声を紹介。「ワンクリックで投稿できる」「手間が大幅に減った」といった感想と共に、『二重投稿』の手間ゼロとWeb集客の最大化を訴求しています。"
      }
    ]
  },
  {
    "id": "hpb-review-ai",
    "name": "HPB口コミAI分析",
    "description": "お客様の声をAIが分析し、最強の「教育ツール」に。スタイリストの強みを見える化します。",
    "catchphrase": "お客様の声が、最強の教育ツールに",
    "detailedDescription": "「指名が多いスタッフとの違いが言語化できない」「お客様が本当に満足している決め手がわからない」といったサロンの課題を解決します。HotPepper Beautyの口コミをAIが分析し、「個人のカルテ」としてフィードバック。データに基づいた強み・弱み分析でスタッフの成長を加速させ、本人も気づいていない\"本当の武器\"を発見して集客力を最大化。お客様の\"生の声\"を伝えることでリピート率向上にも繋がります。",
    "features": [
      "「データ」でスタッフの成長を加速",
      "「個人の魅力」で集客力を最大化",
      "「感動体験」でリピート率向上",
      "スタイリスト指名率: 10% UP",
      "新人スタイリストの定着率: 20% UP",
      "オーナーの教育時間: 30% 削減"
    ],
    "slides": [
      {
        "imageUrl": "/images/apps/hpb-review-ai/slide-1.png",
        "altText": "HPB口コミAI分析のタイトルページ。お客様の声が最強の「教育ツール」に変わることを示し、スタイリスト指名率10%UP、新人定着率20%UP、オーナー教育時間30%削減の効果を提示。"
      },
      {
        "imageUrl": "/images/apps/hpb-review-ai/slide-2.png",
        "altText": "サロンが見過ごしている3つの「なぜ？」を提示。1.指名が多いスタッフとそうでないスタッフの違いが言語化できない。2.お客様が満足している「決め手」が分からない。3.スタッフの「本当の強み」を把握できていない。"
      },
      {
        "imageUrl": "/images/apps/hpb-review-ai/slide-3.png",
        "altText": "AIがお客様の声を「個人のカルテ」に変える仕組みを説明。POINT1:「データ」でスタッフの成長を加速。POINT2:「個人の魅力」で集客力を最大化。POINT3:「感動体験」でリピート率向上。"
      },
      {
        "imageUrl": "/images/apps/hpb-review-ai/slide-4.png",
        "altText": "利用者の声を紹介。「キーワードをプロフィールに載せるだけで新規指名に繋がった」「データで強みを発見し、指導したら指名が3倍になった」といった感想が掲載されています。"
      }
    ]
  },
  {
    "id": "style-repost-app",
    "name": "スタイル上げ直しアプリ",
    "description": "サロンの\"人気スタイル\"をAIが自動で再投稿。手間をかけずに集客効果を最大化します。",
    "catchphrase": "人気スタイルを、AIが自動で再投稿",
    "detailedDescription": "「HPBのスタイル更新が面倒」「もっと接客や技術向上に時間を使いたい」といったお悩みを解決するアプリです。一度お客様に響いた人気スタイルはサロンにとって大切な資産。このアプリが、その資産をExcelで管理し、自動で再投稿し続けます。面倒なPC作業を完全に代行し、手間も広告費もかけずに安定した集客効果を生み出します。スタッフの負担を軽減し、本来の業務に集中できる環境を整えます。",
    "features": [
      "本来の業務に集中できる時間を創出",
      "スタッフの負担を軽減し、生産性最大化",
      "人気スタイルで集客効果を最大化！",
      "スタイル上げ直し時間: 平均90%削減",
      "特定のスタイルのPV数: 平均30%向上"
    ],
    "slides": [
      {
        "imageUrl": "/images/apps/style-repost-app/slide-1.png",
        "altText": "スタイル上げ直しアプリのタイトルページ。サロンの人気スタイルをAIが自動で再投稿する機能と、スタイル上げ直し時間90%削減、特定スタイルのPV数30%向上の効果を提示。"
      },
      {
        "imageUrl": "/images/apps/style-repost-app/slide-2.png",
        "altText": "サロンの悩みを提示。「HPBのスタイル更新、正直めんどう…」「本当はもっと、お客様への接客や技術向上に時間を使いたい」「スタッフの負担を減らしたい」という3つの悩みを挙げています。"
      },
      {
        "imageUrl": "/images/apps/style-repost-app/slide-3.png",
        "altText": "アプリが実現する3つのこと。POINT1:本来の業務に集中できる時間を創出。POINT2:スタッフの負担を軽減し、生産性最大化。POINT3:人気スタイルで集客効果を最大化！"
      },
      {
        "imageUrl": "/images/apps/style-repost-app/slide-4.png",
        "altText": "専門知識不要の簡単な2ステップ操作を説明。STEP1:投稿したいスタイル写真と説明をExcelファイルにまとめる。STEP2:準備したファイルとログイン情報をセットしてボタンを押すだけ。"
      },
      {
        "imageUrl": "/images/apps/style-repost-app/slide-5.png",
        "altText": "利用者の声を紹介。「更新作業を完全に忘れられる」「若手スタッフの負担がゼロになった」といった感想と共に、『手間ゼロ』で安定した集客効果を訴求しています。"
      }
    ]
  },
  {
    "id": "blog-automation-app",
    "name": "ブログ自動生成・投稿アプリ",
    "description": "写真を選ぶだけ。\"売れるブログ\"をAIが3分で作成。ブログ更新の手間を劇的に削減します。",
    "catchphrase": "写真を選ぶだけで、売れるブログが完成",
    "detailedDescription": "「ブログ更新など集客作業が多すぎて本業に集中できない」「時間をかけても集客効果が見えにくい」という悩みを解決。このアプリは、アップロードされたスタイル写真から、AIが予約に結びつきやすい戦略的なブログ記事を自動で作成します。文章が苦手なスタッフでも簡単に\"売れる\"ブログが作成可能になり、サロン全体での情報発信力を底上げし、チームワークを強化します。月20時間の作業がたった2時間になります。",
    "features": [
      "圧倒的な「時間」の創出",
      "”データ”に基づいた集客力の最大化",
      "「属人化」からの脱却",
      "ブログ更新時間: 平均90%削減",
      "特定のクーポン利用率: 平均30%向上"
    ],
    "slides": [
      {
        "imageUrl": "/images/apps/blog-automation-app/slide-1.png",
        "altText": "ブログ自動生成・投稿アプリのタイトルページ。写真を選ぶだけで”売れるブログ”をAIが3分で作成する機能と、ブログ更新時間90%削減、特定クーポン利用率30%向上の効果を提示。"
      },
      {
        "imageUrl": "/images/apps/blog-automation-app/slide-2.png",
        "altText": "サロンの悩みを2点提示。01:集客作業が多すぎて本来の業務に集中できない。02:時間をかけてもブログの集客効果が見えにくい。"
      },
      {
        "imageUrl": "/images/apps/blog-automation-app/slide-3.png",
        "altText": "アプリがもたらす効果を説明。POINT1:圧倒的な「時間」の創出。POINT2:\"データ\"に基づいた集客力の最大化。POINT3:「属人化」からの脱却。"
      },
      {
        "imageUrl": "/images/apps/blog-automation-app/slide-4.png",
        "altText": "専門知識不要の簡単な3ステップ操作を説明。STEP1:モデル画像をアップロード。STEP2:AIがスタイルを分析。STEP3:AIがブログ内容を自動生成・投稿。"
      },
      {
        "imageUrl": "/images/apps/blog-automation-app/slide-5.png",
        "altText": "利用者の声を紹介。「誰でも質の高いブログが作れる」「写真を選ぶだけで投稿でき、業務負担が減った」という感想と共に、面倒なブログ更新をAIに任せることを提案しています。"
      }
    ]
  },
  {
    "id": "repeat-analysis-app",
    "name": "リピート分析アプリ",
    "description": "勘と経験に、\"データ\"という武器を。顧客データを分析し、リピート率を向上させます。",
    "catchphrase": "勘と経験に、データという武器を",
    "detailedDescription": "「なぜお客様が戻ってこないのか」「どのスタッフが本当に貢献しているのか」「どのクーポンが当たりなのか」といった、勘や経験だけでは見えにくい経営課題を解決します。来店データをアップロードするだけで、サロン専属の\"データ分析官\"として機能。お客様の「離脱ポイント」、スタッフの「本当の実力（リピート定着率）」、\"再来店に繋がるクーポン\"を可視化。データに基づいた明確な打ち手で、\"勝てるサロン\"への最短ルートを示します。",
    "features": [
      "お客様の「離脱ポイント」がわかる",
      "スタッフの「本当の実力」がわかる",
      "”再来店に繋がるクーポン”がわかる",
      "新規顧客の初回リピート率12%向上",
      "広告費用対効果(ROAS) 1.5倍に改善",
      "スタッフの目標が明確になり、指名リピートへの意識が向上"
    ],
    "slides": [
      {
        "imageUrl": "/images/apps/repeat-analysis-app/slide-1.png",
        "altText": "リピート分析アプリのタイトルページ。勘と経験に「データ」という武器を加えることを提案し、初回リピート率12%向上、ROAS1.5倍改善などの効果を提示。"
      },
      {
        "imageUrl": "/images/apps/repeat-analysis-app/slide-2.png",
        "altText": "サロンの課題を提示。「お客様がなぜか戻ってこない」「どのスタッフが貢献しているかわからない」「どのクーポンが\"当たり\"かわからない」という3つの悩みを挙げています。"
      },
      {
        "imageUrl": "/images/apps/repeat-analysis-app/slide-3.png",
        "altText": "これまで見えなかった「経営の急所」が一目瞭然になることを説明。POINT1:お客様の「離脱ポイント」がわかる。POINT2:スタッフの「本当の実力」がわかる。POINT3:\"再来店に繋がるクーポン\"がわかる。"
      },
      {
        "imageUrl": "/images/apps/repeat-analysis-app/slide-4.png",
        "altText": "専門知識不要の簡単な3ステップ操作を説明。STEP1:サロンボードから予約情報をCSV出力。STEP2:CSVデータをアプリにアップロード。STEP3:分析結果がグラフで分かりやすく表示される。"
      },
      {
        "imageUrl": "/images/apps/repeat-analysis-app/slide-5.png",
        "altText": "利用者の声を紹介。「リピート率が数字で分かり自信になった」「\"本当にやるべきこと\"が明確になった」という感想と共に、データで導く\"勝てるサロン\"への最短ルートを提案しています。"
      }
    ]
  },
  {
    "id": "review-support-ai",
    "name": "口コミ返信サポートAI",
    "description": "30秒で、心に響く返信を。口コミ対応が、ファンづくりの時間になるAIサポートツールです。",
    "catchphrase": "30秒で、心に響く返信を",
    "detailedDescription": "「本来の業務で手一杯で返信が後回しになる」「返信内容がワンパターン化する」「どう返信していいかわからない」といった口コミ対応の悩みを解決します。HPBやGoogleの口コミをコピー＆ペーストするだけで、AIが感謝と次回来店を促すパーソナルな返信文を自動作成。わずか30秒で作業が完了し、お客様満足度を向上させ、お店のファンを育てます。使えば使うほどAIがお店の\"らしさ\"を学習し、「専属ライター」として成長します。",
    "features": [
      "「心に響く返信」で、ファンを育てる",
      "“わずか30秒”で、返信作業が完了",
      "お店の”らしさ”をAIが学習・成長",
      "口コミ返信時間: 平均90%削減",
      "口コミ経由の再来店率: 平均15%向上"
    ],
    "slides": [
      {
        "imageUrl": "/images/apps/review-support-ai/slide-1.png",
        "altText": "口コミ返信サポートAIのタイトルページ。30秒で心に響く返信を作成し、口コミ対応をファンづくりの時間に変えることを提案。返信時間90%削減、口コミ経由の再来店率15%向上の効果を提示。"
      },
      {
        "imageUrl": "/images/apps/review-support-ai/slide-2.png",
        "altText": "口コミ返信に関する3つの悩みを提示。時間の悩み（後回しになる）、品質の悩み（ワンパターン化する）、ノウハウの悩み（どう返せばいいかわからない）。"
      },
      {
        "imageUrl": "/images/apps/review-support-ai/slide-3.png",
        "altText": "アプリがもたらす3つのベネフィットを紹介。POINT1:「心に響く返信」でファンを育てる。POINT2:\"わずか30秒\"で返信作業が完了。POINT3:お店の\"らしさ\"をAIが学習・成長。"
      },
      {
        "imageUrl": "/images/apps/review-support-ai/slide-4.png",
        "altText": "専門知識不要の簡単な3ステップ操作を画面キャプチャと共に説明。STEP1:HPBやGoogleMapの口コミをコピー。STEP2:コピーした口コミをアプリにペースト。STEP3:AIが自動で最適な返信を出力。"
      },
      {
        "imageUrl": "/images/apps/review-support-ai/slide-5.png",
        "altText": "利用者の声を紹介。「若手でもプロ品質の返信ができる」「返信の質が上がりリピートに繋がっている」といった感想と共に、面倒な返信作業から解放されることを提案しています。"
      }
    ]
  },
  {
    "id": "style-title-generator",
    "name": "ヘアスタイルタイトルジェネレーター",
    "description": "1分で、心惹かれるスタイル文章を。AIがあなたの専属コピーライターになります。",
    "catchphrase": "1分で、心惹かれるスタイル文章を",
    "detailedDescription": "「スタイル投稿の文章を考えるのが大変」「HotPepperの特集を狙いたいが、どんな文章が響くかわからない」「若手に任せたいが文章のクオリティが心配」といった課題を、AIアシスタントがたった1分で解決します。キーワードを入れるだけで、AIが人気のスタイルを分析し、魅力的な「タイトル」「メニュー」「コメント」「ハッシュタグ」を瞬時に提案。トレンドを逃さない特集連動も可能で、サロン全体の集客力を底上げします。",
    "features": [
      "【手間を90%削減】SNS投稿の作成が”驚くほど”簡単に",
      "【集客効果を最大化】トレンドを逃さない「特集連動」",
      "【属人化を解消】サロン全体の集客力を底上げ",
      "PV数: 20% UP!",
      "作業時間: 10分 → 1分"
    ],
    "slides": [
      {
        "imageUrl": "/images/apps/style-title-generator/slide-1.png",
        "altText": "ヘアスタイルタイトルジェネレーターのタイトルページ。1分で心惹かれるスタイル文章を作成するAIコピーライターとして、PV数20%UP、作業時間10分から1分への短縮効果を提示。"
      },
      {
        "imageUrl": "/images/apps/style-title-generator/slide-2.png",
        "altText": "スタイル情報に関する3つの課題を提示。課題1:スタイル投稿を考えるのが大変。課題2:HotPepperの特集の狙い方がわからない。課題3:若手に任せるのが心配。"
      },
      {
        "imageUrl": "/images/apps/style-title-generator/slide-3.png",
        "altText": "アプリ導入で「こう変わる」を3つのポイントで紹介。POINT1:手間を90%削減しSNS投稿が簡単に。POINT2:トレンドを逃さない「特集連動」で集客効果を最大化。POINT3:属人化を解消しサロン全体の集客力を底上げ。"
      },
      {
        "imageUrl": "/images/apps/style-title-generator/slide-4.png",
        "altText": "スタイル文章作成をAIがサポートするアプリの3つの機能を紹介。1.シーズン選択機能。2.コピー機能。3.エクスポート機能。"
      },
      {
        "imageUrl": "/images/apps/style-title-generator/slide-5.png",
        "altText": "専門知識不要の簡単な3ステップ操作を説明。STEP1:キーワードを入れるだけ。STEP2:ターゲットを選ぶだけ。STEP3:『生成ボタン』を押すだけ。"
      },
      {
        "imageUrl": "/images/apps/style-title-generator/slide-6.png",
        "altText": "利用者の声を紹介。「文章センスに自信がなくても助かる」「AIのクリエイティブな提案でネタ切れ知らず」といった感想と共に、「もう、投稿で悩まない。」というメッセージを伝えています。"
      }
    ]
  },
  {
    "id": "style-image-ai-app",
    "name": "スタイル画像AI加工アプリ",
    "description": "たった1枚の写真から、\"理想のスタイル\"を無限に創り出すAIアプリです。",
    "catchphrase": "1枚の写真から、理想のスタイルを無限に",
    "detailedDescription": "スタイル撮影における「表現のマンネリ化」や「理想とのギャップ」といった限界を感じていませんか？このアプリは、最新AIを用いて、たった1枚の写真から誰でも簡単に高品質なスタイル画像を無限に生成します。背景の変更や髪のツヤ・透明感の追加など、従来の手作業では難しかった加工もワンタッチで実現。サロンの魅力を最大限に引き出し、”見せる”から”魅せる”集客へと進化させます。",
    "features": [
      "【LADIES' STYLE】背景や明るさの変更でモデルの透明感を向上",
      "【MEN'S STYLE】髪にプロが仕上げたような自然なツヤを追加",
      "PV数: 平均1.5倍",
      "スタイル画像の制作コスト: 平均90%削減"
    ],
    "slides": [
      {
        "imageUrl": "/images/apps/style-image-ai-app/slide-1.png",
        "altText": "スタイル画像AI加工アプリのタイトルページ。たった1枚の写真から理想のスタイルを無限に創り出す機能と、PV数1.5倍、制作コスト90%削減の効果を提示。"
      },
      {
        "imageUrl": "/images/apps/style-image-ai-app/slide-2.png",
        "altText": "スタイル撮影が抱える「限界」を提示。「表現のマンネリ化」と「理想とのギャップ」という2つの課題を挙げています。"
      },
      {
        "imageUrl": "/images/apps/style-image-ai-app/slide-3.png",
        "altText": "AIが創造力をカタチにし、\"見せる\"から\"魅せる\"集客へ導くことを説明。レディースとメンズのスタイル加工例をビフォーアフターで紹介。"
      },
      {
        "imageUrl": "/images/apps/style-image-ai-app/slide-4.png",
        "altText": "専門知識不要の簡単な3ステップ操作を説明。STEP1:画像をアップロード。STEP2:プロンプトを入力。STEP3:画像生成。"
      },
      {
        "imageUrl": "/images/apps/style-image-ai-app/slide-5.png",
        "altText": "利用者の声を紹介。「カウンセリングがスムーズになった」「SNS投稿のバリエーションが増えた」といった感想と共に、「撮影の限界を超え、AIで”魅せる”集客を当たり前に。」と訴求。"
      }
    ]
  },
  {
    "id": "counseling-analysis-app",
    "name": "カウンセリング分析アプリ",
    "description": "お客様の\"本音\"を見える化し、リピート率を劇的に改善。カウンセリング音声をAIが分析します。",
    "catchphrase": "お客様の本音を見える化し、リピート率改善",
    "detailedDescription": "「新人や若手のカウンセリングが不安」「トップスタイリストの接客術が属人化している」「高評価なのに失客してしまう」といった、スタッフ育成とリピート率の悩みを解決します。カウンセリング音声をアップロードするだけで、AIが会話を客観的に分析・スコアリング。お客様の隠れた要望や本音のヒントを発見し、トップスタイリストの優れたトークを蓄積・共有することで、サロン全体の接客スキルを底上げします。「なんとなく」の改善から卒業し、サロンの未来を強くします。",
    "features": [
      "カウンセリングを客観的に分析",
      "”お客様の本音”のヒントを発見",
      "お手本トークを蓄積・共有",
      "リピート率: 平均 15% UP",
      "カウンセリング満足度: 92% が「満足度が向上した」と回答",
      "教育時間: スタッフ指導時間が40% 削減"
    ],
    "slides": [
      {
        "imageUrl": "/images/apps/counseling-analysis-app/slide-1.png",
        "altText": "カウンセリング分析アプリのタイトルページ。お客様の本音の見える化によるリピート率改善を提案し、リピート率15%UP、満足度向上、教育時間40%削減の効果を提示。"
      },
      {
        "imageUrl": "/images/apps/counseling-analysis-app/slide-2.png",
        "altText": "サロンの悩みを提示。「スタッフ育成の悩み」と「リピート率の悩み」の2つのカテゴリで、具体的な課題を挙げています。"
      },
      {
        "imageUrl": "/images/apps/counseling-analysis-app/slide-3.png",
        "altText": "このアプリで出来ることを3つのポイントで紹介。01:カウンセリングを客観的に分析。02:”お客様の本音”のヒントを発見。03:お手本トークを蓄積・共有。"
      },
      {
        "imageUrl": "/images/apps/counseling-analysis-app/slide-4.png",
        "altText": "専門知識不要の簡単な3ステップ操作を説明。STEP1:カウンセリング音声を録音する。STEP2:録音した音声をアップロード。STEP3:AIがカウンセリングを評価。"
      },
      {
        "imageUrl": "/images/apps/counseling-analysis-app/slide-5.png",
        "altText": "利用者の声を紹介。「データで口癖の課題が判明した」「客観的なアドバイスが可能になった」といった感想と共に、「感覚的な指導から卒業。データで接客スキルを底上げし、サロンの未来を強くする。」と訴求。"
      }
    ]
  }
]

/**
 * IDからアプリデータを取得
 */
export function getAppById(id: string): App | undefined {
  return APPS_DATA.find(app => app.id === id);
}

/**
 * 全アプリデータを取得
 */
export function getAllApps(): App[] {
  return APPS_DATA;
}