// --- Global Variables & Constants ---
// --- グローバル変数と定数 ---
// This section declares variables that are used throughout the entire game, like the scene, camera, and renderer.
// It also holds constants for asset paths and translation strings.
// このセクションでは、シーン、カメラ、レンダラーなど、ゲーム全体で使用される変数を宣言します。
// また、アセットパスや翻訳文字列の定数も保持します。
let scene, camera, renderer, clock;
let targetingCursor, turnIndicatorPointer;

const ASSETS = {
    BACKGROUND: 'images/background.png',
    DARKNESS: 'images/darkness.png',
    AQUA: 'images/aqua.png',
    KAZUMA: 'images/kazuma.png',
    MEGUMIN: 'images/megumin.png',
    TOAD: 'images/toad.png',
    WIZ: 'images/wiz.png',
    VANIR: 'images/vanir.png',
    KOMEKKO: 'images/komekko.png',
    CHOMOSUKE: 'images/chomosuke.png'
};

const TRANSLATIONS = {
    en: {
        darkness: "Darkness", aqua: "Aqua", kazuma: "Kazuma", megumin: "Megumin", giant_toad: "Giant Toad",
        attack: "Attack", skill: "Skill", magic: "Magic", defend: "Defend", item: "Item", limit_break: "Limit Break", summon: "Summon",
        skills: "SKILLS", spells: "SPELLS", holy_magic: "HOLY MAGIC", items: "ITEMS", summons: "SUMMONS",
        turn: "'s Turn", attacks: "attacks!", takes_damage: "takes damage.", misses: "...but it misses!",
        uses: "uses", not_enough_mp: "Not enough MP!", defends: "is defending.", victory: "VICTORY!", game_over: "GAME OVER",
        taunt: "Taunt", steal: "Steal", explosion: "EXPLOSION!", masochistic_guard: "Masochistic Guard", heal_wind: "Heal Wind", resurrection: "Resurrection",
        god_blow: "God Blow", panty_steal: "Panty Steal", blessing: "Blessing", potion: "Potion", ether: "Ether", cover: "Cover", party_trick: "Party Trick", focus: "Focus",
        snipe: "Snipe", drain_touch: "Drain Touch", create_water: "Create Water", freeze: "Freeze", tongue_lash: "Tongue Lash", immovable_fortress: "Immovable Fortress",
        eagle_eye: "Eagle Eye", poison_tongue: "Poison Tongue", purification: "Purification", hero_potion: "Hero Potion", chomosuke: "Chomosuke", summoning_chant: "Summoning Chant",
        sacred_turn_undead: "Sacred Turn Undead",
        chunchunmaru: "Equip: Chunchunmaru",
        taunt_msg: "draws all enemies' attention!", steal_msg: "'s defense was lowered!", explosion_msg: "is hit by the full force of the blast!",
        god_blow_msg: "is struck by a divine blow!", masochistic_guard_msg: "is oddly happy to be the center of attention!",
        blessing_msg: "'s luck has increased!", potion_msg: "recovers HP.", ether_msg: "recovers MP.", hero_potion_msg: "'s spirit is invigorated!", use_on: "Target?",
        cover_msg: "is ready to protect her friends!", cover_proc_msg: "Darkness jumps in the way!", party_trick_msg: "Everyone feels motivated!", focus_msg: "is gathering explosive power!",
        stun_msg: "is stunned!", petrify_msg: "has been turned to stone!", slow_msg: "is slowed!", haste_msg: "feels faster!",
        attack_up_msg: "'s attack rose!", defense_up_msg: "'s defense rose!", purification_msg: "'s status is restored!", eagle_eye_msg: "'s eyes are sharp!",
        chomosuke_gaoo_msg: "Chomosuke lets out a mighty 'GAOO!!'", instant_kill_msg: "was obliterated!", one_hp_msg: "was merely scratched!",
        cast_on_dead: "Cannot target a fallen ally.", resurrect_dead: "is already fine!",
        wiz: "Wiz", vanir: "Vanir", komekko: "Komekko",
        wiz_msg: "Wiz casts Cursed Crystal Prison!", vanir_msg: "Vanir unleashes his Death Ray!", komekko_msg: "Komekko cheers for the party!",
        death_slash_fail: "...but nothing happens!",
        jump_msg: "jumps high into the air!",
        land_msg: "crashes down on",
        regen_party_msg: "The party is blessed with regenerating health!",
        and_is_slowed: "and is slowed!",
        and_is_poisoned: "and is poisoned!",
        
        // New keys for hardcoded text
        no_valid_targets: "No valid targets!",
        steal_fail: "...But it failed!",
        party_member_invigorated: "feels invigorated!",
        dark_power_gathers: "A dark power gathers...",
        damage_multiplier: "Damage x",
        miss_attack: "Miss!",
        death_slash: "DEATH SLASH!",
        blunt_strike: "Blunt Strike!",
        noob_slash: "Noob Slash...",
        kazuma_trip_msg: "...Kazuma tripped!",
        perfect: "Perfect!",
        good: "Good!",
        minigame_tap: "TAP!",
        minigame_stop: "STOP!",
        minigame_miss: "Miss",
        minigame_good: "Good",
        minigame_yeah: "Yeah!",
        enemies_defeated: "s are defeated!",
        party_defeated: "The party is defeated...",
        not_enough_gf: "Not enough GF Gauge!",
        megumin_quote_1: "Behold my ultimate magic!",
        megumin_quote_2: "Tremble before my power!",
        megumin_quote_3: "This world shall know pain... EXPLOSION!",
        megumin_quote_4: "Blacker than black, darker than dark...",


        // Descriptions
        taunt_desc: "Draws all enemies' attacks.", cover_desc: "Chance to take damage for an ally.", immovable_fortress_desc: "Greatly boosts own DEF.",
        blessing_desc: "Slightly raises party LUK and grants HP Regen.", heal_wind_desc: "Applies HP Regen to one ally.", resurrection_desc: "Revives a fallen ally.", party_trick_desc: "Restores MP and boosts Limit gain for the party.", purification_desc: "Removes all negative status effects from an ally.",
        steal_desc: "Lowers an enemy's defense.", snipe_desc: "A powerful and accurate ranged attack.", eagle_eye_desc: "Greatly increases own Critical Hit rate.",
        drain_touch_desc: "Drains HP from one enemy.", create_water_desc: "A weak water attack.", freeze_desc: "Hurls a shard of ice at one enemy.",
        focus_desc: "Greatly increases own Limit gauge.", summoning_chant_desc: "Greatly increases the Summon gauge.",
        potion_desc: "Restores a small amount of HP.", ether_desc: "Restores a small amount of MP.", hero_potion_desc: "Fills the Limit gauge to 100%.",
        sacred_turn_undead_desc: "Deals massive holy damage to one foe. Super effective against the undead."
    },
    jp: { 
        darkness: "ダクネス", aqua: "アクア", kazuma: "カズマ", megumin: "めぐみん", giant_toad: "ジャイアント・トード",
        attack: "こうげき", skill: "スキル", magic: "まほう", defend: "ぼうぎょ", item: "アイテム", limit_break: "ひっさつわざ", summon: "しょうかん",
        skills: "スキル", spells: "まほう", items: "アイテム", summons: "しょうかん",
        turn: "のターン", attacks: "のこうげき！", takes_damage: "のダメージ。", misses: "しかし、こうげきははずれた！",
        uses: "は", not_enough_mp: "MPがたりない！", defends: "は防御している。", victory: "やった！", game_over: "ゲームオーバー", use_on: "だれに？",
        taunt: "挑発", steal: "スティール", explosion: "エクスプロージョン！", masochistic_guard: "受虐の盾", heal_wind: "ヒールウィンド", resurrection: "リザレクション",
        god_blow: "ゴッドブロー", panty_steal: "パンツスティール", blessing: "ブレッシング", potion: "ポーション", ether: "エーテル", cover: "かばう", party_trick: "宴会芸", focus: "集中",
        snipe: "狙撃", drain_touch: "ドレインタッチ", create_water: "クリエイト・ウォーター", freeze: "フリーズ", tongue_lash: "舌打ち", immovable_fortress: "不動要塞",
        eagle_eye: "イーグルアイ", poison_tongue: "毒の舌", purification: "浄化", hero_potion: "英雄のポーション", chomosuke: "ちょむすけ", summoning_chant: "召喚詠唱",
        sacred_turn_undead: "セイクリッド・ターンアンデッド",
        chunchunmaru: "ちゅんちゅん丸",
        taunt_msg: "は敵全体の注意を引いた！", steal_msg: "の防御が下がった！", explosion_msg: "は爆発の直撃を受けた！",
        god_blow_msg: "は神の一撃を受けた！", masochistic_guard_msg: "は注目を浴びて喜んでいる！",
        blessing_msg: "の運が上がった！", potion_msg: "はHPを回復した。", ether_msg: "はMPを回復した。", hero_potion_msg: "の気力が回復した！",
        cover_msg: "は仲間を守る準備ができた！", cover_proc_msg: "ダクネスが割り込んだ！", party_trick_msg: "みんなのやる気が上がった！", focus_msg: "は爆裂の魔力を溜めている！",
        stun_msg: "は気絶した！", petrify_msg: "は石になった！", slow_msg: "は遅くなった！", haste_msg: "は速くなった！",
        attack_up_msg: "の攻撃が上がった！", defense_up_msg: "の防御が上がった！", purification_msg: "の状態が回復した！", eagle_eye_msg: "の目が鋭くなった！",
        chomosuke_gaoo_msg: "ちょむすけは力強く「がおー！」と鳴いた！", instant_kill_msg: "は消し飛ばされた！", one_hp_msg: "はかすり傷を負った！",
        cast_on_dead: "倒れた仲間には使えない。", resurrect_dead: "は既に元気だ！",
        wiz: "ウィズ", vanir: "バニル", komekko: "こめっこ",
        wiz_msg: "ウィズはカースド・クリスタルプリズンを放った！", vanir_msg: "バニルはデスレイを放った！", komekko_msg: "こめっこはパーティを応援している！",
        death_slash_fail: "…しかし何も起こらなかった！",
        jump_msg: "は高く飛び上がった！",
        land_msg: "は",
        regen_party_msg: "パーティは再生の祝福を受けた！",
        and_is_slowed: "、そして遅くなった！",
        and_is_poisoned: "、そして毒になった！",

        // New keys for hardcoded text
        no_valid_targets: "有効なターゲットがいません！",
        steal_fail: "…しかし失敗した！",
        party_member_invigorated: "は元気になった！",
        dark_power_gathers: "闇の力が集まってくる…",
        damage_multiplier: "ダメージx",
        miss_attack: "ミス！",
        death_slash: "デス・スラッシュ！",
        blunt_strike: "ブラント・ストライク！",
        noob_slash: "ヘボ・スラッシュ…",
        kazuma_trip_msg: "…カズマは転んだ！",
        perfect: "パーフェクト！",
        good: "グッド！",
        minigame_tap: "タップ！",
        minigame_stop: "ストップ！",
        minigame_miss: "ミス",
        minigame_good: "グッド",
        minigame_yeah: "イェイ！",
        enemies_defeated: "を倒した！",
        party_defeated: "パーティは全滅した…",
        not_enough_gf: "GFゲージが足りない！",
        megumin_quote_1: "我が究極の魔法を見るがいい！",
        megumin_quote_2: "我が力に震えるがいい！",
        megumin_quote_3: "世界よ、痛みを知れ… エクスプロージョン！",
        megumin_quote_4: "黒より黒く、闇より暗き漆黒に…",

        // Descriptions
        taunt_desc: "敵全体の攻撃を引きつける。", cover_desc: "確率で味方のダメージを肩代わりする。", immovable_fortress_desc: "自身の防御力を大幅に上げる。",
        blessing_desc: "パーティ全体の運を少し上げ、HPリジェネを付与する。", heal_wind_desc: "味方一人にHPリジェネを付与する。", resurrection_desc: "倒れた味方を復活させる。", party_trick_desc: "パーティのMPを回復し、リミットゲージの増加量を上げる。", purification_desc: "味方の全ての悪いステータス効果を消す。",
        steal_desc: "敵の防御力を下げる。", snipe_desc: "強力で正確な遠距離攻撃。", eagle_eye_desc: "自身のクリティカルヒット率を大幅に上げる。",
        drain_touch_desc: "敵からHPを吸収する。", create_water_desc: "弱い水属性の攻撃。", freeze_desc: "敵に氷の礫を放つ。",
        focus_desc: "自身のリミットゲージを大幅に溜める。", summoning_chant_desc: "召喚ゲージを大幅に溜める。",
        potion_desc: "HPを少し回復する。", ether_desc: "MPを少し回復する。", hero_potion_desc: "リミットゲージを100%にする。",
        sacred_turn_undead_desc: "アンデッドに絶大な聖属性ダメージを与える。"
    }
};

let currentLanguage = 'en';
const allCharacters = [];
const actionQueue = [];

const meguminFocusQuotes = [
    "megumin_quote_1",
    "megumin_quote_2",
    "megumin_quote_3",
    "megumin_quote_4",
];


// --- Character & Game Data ---
// --- キャラクターとゲームデータ ---
// This section defines all the core statistics for player characters (party), items in the inventory,
// and summonable Guardian Forces (GFs). All stats, skills, and spells are configured here.
// このセクションでは、プレイヤーキャラクター（パーティ）、インベントリ内のアイテム、
// および召喚可能なガーディアンフォース（GF）のすべてのコア統計を定義します。すべてのステータス、スキル、魔法はここで設定されます。
const party = [
    { name_key: "darkness", hp: 220, maxHp: 220, mp: 20, maxMp: 20, attack: 5, defense: 100, speed: 45, luk: 10, atb: 0, limit: 0, sprite: null, isPlayer: true, defending: false, statusEffects: [], onCooldown: [], skills: [{name_key: 'taunt', cost: 5, type: 'utility_aoe_enemy', cooldown: 1}, {name_key: 'cover', cost: 10, type: 'utility_self', cooldown: 1}, {name_key: 'immovable_fortress', cost: 15, type: 'utility_self', cooldown: 1}], spells: [], limitBreak: {name_key: 'masochistic_guard', type: 'utility'} },
    { name_key: "aqua", hp: 170, maxHp: 170, mp: 120, maxMp: 120, attack: 40, defense: 50, speed: 50, luk: 15, atb: 0, limit: 0, sprite: null, isPlayer: true, defending: false, statusEffects: [], onCooldown: [], skills: [],
    spells: [
        {name_key: 'blessing', cost: 20, power: 10, type: 'utility_party', cooldown: 1}, 
        {name_key: 'heal_wind', cost: 15, power: 30, type: 'healing', cooldown: 1}, 
        {name_key: 'resurrection', cost: 40, type: 'revive', cooldown: 1}, 
        {name_key: 'party_trick', cost: 10, type: 'utility_party', mpRecover: 10, limitGain: 15, limitBoostTurns: 3, cooldown: 1}, 
        {name_key: 'purification', cost: 8, type: 'healing', cooldown: 1},
        {name_key: 'sacred_turn_undead', cost: 30, power: 120, type: 'magic_enemy', cooldown: 2}
    ],
    limitBreak: {name_key: 'god_blow', power: 150, type: 'physical'} },
    { name_key: "kazuma", hp: 150, maxHp: 150, mp: 40, maxMp: 40, attack: 55, defense: 40, speed: 60, luk: 20, atb: 0, limit: 0, sprite: null, isPlayer: true, defending: false, statusEffects: [], onCooldown: [],
    skills: [ {name_key: 'steal', cost: 5, type: 'utility_enemy', cooldown: 1}, {name_key: 'snipe', cost: 10, power: 90, type: 'physical_enemy', cooldown: 1}, {name_key: 'eagle_eye', cost: 12, type: 'utility_self', cooldown: 1} ],
    spells: [ {name_key: 'drain_touch', cost: 8, power: 40, type: 'draining_enemy', cooldown: 1}, {name_key: 'create_water', cost: 4, power: 20, type: 'magic_enemy', cooldown: 1}, {name_key: 'freeze', cost: 12, power: 75, type: 'magic_enemy', cooldown: 1} ],
    limitBreak: {name_key: 'chunchunmaru', type: 'physical'} },
    { name_key: "megumin", hp: 120, maxHp: 120, mp: 100, maxMp: 100, attack: 10, defense: 30, speed: 40, luk: 5, atb: 0, limit: 0, sprite: null, isPlayer: true, defending: false, statusEffects: [], onCooldown: [], skills: [{name_key: 'focus', cost: 15, type: 'utility_self', cooldown: 1}, {name_key: 'summoning_chant', cost: 20, type: 'utility_self', cooldown: 1}], spells: [], limitBreak: {name_key: 'explosion', power: 999, type: 'magic'} }
];

const enemies = [];

const inventory = [
    { name_key: 'potion', quantity: 5, type:'healing', effect: (target) => { if(target.hp > 0){ heal(target, 80); logMessage(`${t(target.name_key)} ${t('potion_msg')}`); return true; } else { logMessage(t('cast_on_dead')); return false; } } },
    { name_key: 'ether', quantity: 3, type:'healing', effect: (target) => { if(target.hp > 0){ restoreMp(target, 50); logMessage(`${t(target.name_key)} ${t('ether_msg')}`); return true; } else { logMessage(t('cast_on_dead')); return false; } } },
    { name_key: 'hero_potion', quantity: 1, type:'healing', effect: (target) => { if(target.hp > 0){ target.limit = 100; logMessage(`${t(target.name_key)} ${t('hero_potion_msg')}`); return true; } else { logMessage(t('cast_on_dead')); return false; } } }
];

const guardianForces = [
    { name_key: 'wiz', cost: 100, effect: () => { 
        logMessage(t('wiz_msg')); 
        enemies.forEach(e => {
            if (e.hp > 0) {
                takeDamage(e, 300);
                e.statusEffects.push({name: 'slow', turns: 3});
                logMessage(`${t(e.name_key)} #${e.id+1} ${t('slow_msg')}`);
            }
        });
    }},
    { name_key: 'vanir', cost: 100, effect: () => { 
        logMessage(t('vanir_msg')); 
        enemies.forEach(e => {
            if (e.hp > 0) {
                takeDamage(e, 250, true);
                if (Math.random() < 0.5) {
                    e.statusEffects.push({name: 'petrify', turns: 2});
                    logMessage(`${t(e.name_key)} #${e.id+1} ${t('petrify_msg')}`);
                }
            }
        });
    }},
    { name_key: 'komekko', cost: 100, effect: () => { 
        logMessage(t('komekko_msg')); 
        animatePartyAura();
        party.forEach(p => { 
            if(p.hp > 0) { 
                heal(p, 9999); 
                restoreMp(p, 9999); 
                p.statusEffects.push({name: 'haste', turns: 3});
                p.statusEffects.push({name: 'attack_up', turns: 3, power: 20});
                p.statusEffects.push({name: 'defense_up', turns: 3, power: 20});
                logMessage(`${t(p.name_key)} ${t('party_member_invigorated')}`);
            }
        });
    }},
    { name_key: 'chomosuke', cost: 100, effect: () => {
        logMessage(t('chomosuke_gaoo_msg'));
        enemies.forEach(e => {
            if(e.hp > 0) {
                if (Math.random() < 0.25) { // 25% chance
                    e.hp = 0;
                    logMessage(`${t(e.name_key)} #${e.id+1} ${t('instant_kill_msg')}`);
                    animateDefeat(e);
                } else {
                    takeDamage(e, 1);
                    logMessage(`${t(e.name_key)} #${e.id+1} ${t('one_hp_msg')}`);
                }
            }
        });
    }}
];

// --- State Variables ---
// --- 状態変数 ---
// These variables track the current state of the battle, such as who is acting, if an action is in progress,
// and what the player is currently selecting in the menus.
// これらの変数は、誰が行動しているか、アクションが進行中か、
// プレイヤーがメニューで何を選択しているかなど、戦闘の現在の状態を追跡します。
let activeCharacter = null, isActionInProgress = false, commandState = 'main';
let selectedAbility = null, selectedItem = null;
let currentSelectionIndex = 0, currentTargetSelectionIndex = 0;
let currentTargetingState = '';
let gfGauge = 0;

// --- Utility Functions ---
// --- ユーティリティ関数 ---
// Helper functions for common tasks like translation, damage calculation, healing, and MP restoration.
// 翻訳、ダメージ計算、回復、MP回復などの一般的なタスクのためのヘルパー関数です。
function t(key) { return TRANSLATIONS[currentLanguage][key] || key; }

function takeDamage(target, amount, ignoreDefense = false){
    let finalAmount = Math.floor(amount);
    if(target.defending && !ignoreDefense) finalAmount = Math.floor(finalAmount / 2);

    let totalDefense = (target.defense || 0) * 0.75; 
    const defenseUp = target.statusEffects.find(e => e.name === 'defense_up');
    if (defenseUp) totalDefense *= (1 + defenseUp.power / 100);

    finalAmount = Math.max(1, Math.floor(finalAmount - totalDefense));

    target.hp = Math.max(target.hp - finalAmount, 0);
    if(target.isPlayer) {
        let limitIncrease = (finalAmount / target.maxHp) * 50;
        if (target.statusEffects.some(e => e.name === 'limit_boost')) {
            limitIncrease *= 2;
        }
        target.limit = Math.min(100, target.limit + limitIncrease);
        gfGauge = Math.min(100, gfGauge + 5);
        updateGfGaugeUI();
    }
    return finalAmount;
}
function heal(target, amount){ target.hp = Math.min(target.hp + amount, target.maxHp); }
function restoreMp(target, amount){ target.mp = Math.min(target.mp + amount, target.maxMp); }

// --- Core Game Initialization & Loop ---
// --- ゲームの初期化とメインループ ---
// The `init` function sets up the entire game scene with Three.js, loads assets, and starts the main `animate` loop.
// The `animate` loop is the heartbeat of the game, updating animations and game logic every frame.
// `init`関数は、Three.jsでゲームシーン全体をセットアップし、アセットを読み込み、メインの`animate`ループを開始します。
// `animate`ループはゲームの心臓部であり、フレームごとにアニメーションとゲームロジックを更新します。
function init() {
    scene = new THREE.Scene();
    clock = new THREE.Clock();
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    document.getElementById('canvas-container').appendChild(renderer.domElement);
    const aspect = window.innerWidth / window.innerHeight;
    const viewSize = 12;
    camera = new THREE.OrthographicCamera(-viewSize * aspect / 2, viewSize * aspect / 2, viewSize / 2, -viewSize / 2, -100, 100);
    camera.position.set(0, 0, 10);
   
    createEnemies();
    allCharacters.push(...party, ...enemies);

    loadAssets();
    setupTargeting();
    setupUI();
    setupHotkeys();
    window.addEventListener('resize', onWindowResize);
    onWindowResize();
    animate();
}

function createEnemies() {
    for (let i = 0; i < 3; i++) {
        enemies.push({
            name_key: "giant_toad", 
            id: i,
            hp: 400, maxHp: 400, 
            attack: 110,
            defense: 20, speed: 35 + Math.random() * 10, atb: Math.random() * 50,
            sprite: null, isPlayer: false, defending: false, isTauntedBy: null, defenseDebuff: false, statusEffects: [],
            skills: [
                {name_key: 'tongue_lash', power: 60, chance: 0.2, type: 'aoe_slow'},
                {name_key: 'jump', power: 210, chance: 0.3, type: 'jump_attack'},
                {name_key: 'poison_tongue', power: 10, chance: 0.2, type: 'physical_poison'}
            ]
        });
    }
}

function onWindowResize() {
    const aspect = window.innerWidth / window.innerHeight;
    const viewSize = 12;
    camera.left = -viewSize * aspect / 2; camera.right = viewSize * aspect / 2;
    camera.top = viewSize / 2; camera.bottom = -viewSize / 2;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function loadAssets() {
    const manager = new THREE.LoadingManager();
    manager.onLoad = () => { logMessage(`${t('giant_toad')}${t('enemies_defeated')}`); }; // Example of using new key
    const textureLoader = new THREE.TextureLoader(manager);
    textureLoader.load(ASSETS.BACKGROUND, (texture) => { scene.background = texture; });
    party.forEach((char, i) => {
        const xPos = 5.5 - (i * 1.5), yPos = -1.5 + (i * 0.5), scale = 2 - i * 0.1;
        createCharacterSprite(textureLoader, ASSETS[char.name_key.toUpperCase()], char, new THREE.Vector3(xPos, yPos, 0), scale);
    });
    createCharacterSprite(textureLoader, ASSETS.TOAD, enemies[0], new THREE.Vector3(-5.0, -0.5, 0), 3.5);
    createCharacterSprite(textureLoader, ASSETS.TOAD, enemies[1], new THREE.Vector3(-2.0, -0.5, 0), 3.5);
    createCharacterSprite(textureLoader, ASSETS.TOAD, enemies[2], new THREE.Vector3(-3.5, -1.8, 0), 3.2);
}

function createCharacterSprite(loader, filePath, character, position, size = 2) {
    const texture = loader.load(filePath, (tex) => { tex.magFilter = THREE.NearestFilter; tex.minFilter = THREE.NearestFilter; });
    const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
    character.sprite = new THREE.Sprite(material);
    character.sprite.scale.set(size, size, 1);
    character.sprite.userData = { character, originalPos: position.clone() };
    character.sprite.position.copy(position);
    scene.add(character.sprite);
}

function animate() {
    requestAnimationFrame(animate);
    const deltaTime = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    if (turnIndicatorPointer && turnIndicatorPointer.visible) {
        turnIndicatorPointer.position.y = turnIndicatorPointer.userData.originalY + Math.sin(elapsedTime * 8) * 0.1;
    }
    if (targetingCursor && targetingCursor.visible) {
        targetingCursor.position.y = targetingCursor.userData.originalY + Math.sin(elapsedTime * 6) * 0.15;
    }

    TWEEN.update();
   
    updateAllStatusEffects(deltaTime);
    processATB(deltaTime);
    processActionQueue();
    renderer.render(scene, camera);
}

// --- Turn Management & Game Flow ---
// --- ターン管理とゲームフロー ---
// These functions control the flow of battle. They process status effects, fill ATB gauges,
// manage the queue of who acts next, and check for victory or defeat.
// これらの関数は戦闘の流れを制御します。ステータス効果を処理し、ATBゲージを溜め、
// 次に行動するキャラクターのキューを管理し、勝利または敗北をチェックします。
function updateAllStatusEffects(deltaTime) {
    for(const character of allCharacters) {
        if (character.hp <= 0 && !character.isPlayer) continue; 

        for (let i = character.statusEffects.length - 1; i >= 0; i--) {
            const effect = character.statusEffects[i];
           
            if (!effect.hasOwnProperty('timer')) {
                effect.timer = effect.turns * 2;
            }
            effect.timer -= deltaTime;

            if (effect.timer <= 0) {
                if(effect.name === 'jumping') {
                    character.sprite.visible = true;
                    const livingParty = party.filter(p => p.hp > 0);
                    if (livingParty.length > 0) {
                        const target = livingParty[Math.floor(Math.random() * livingParty.length)];
                        isActionInProgress = true; 
                       
                        animateLand(character, target, () => {
                            logMessage(`${t(character.name_key)} #${character.id + 1} ${t('land_msg')} ${t(target.name_key)}!`);
                            const jumpSkill = character.skills.find(s => s.name_key === 'jump');
                            const damage = Math.floor(jumpSkill.power * (Math.random() * 0.2 + 0.9));
                            const dealtDamage = takeDamage(target, damage);
                            if (target.hp <= 0) animateDefeat(target);
                            logMessage(`${t(target.name_key)} ${dealtDamage} ${t('takes_damage')}`);
                            character.atb = 0; 
                            setTimeout(() => { 
                                isActionInProgress = false;
                            }, 500); 
                        });
                    }
                }
                character.statusEffects.splice(i, 1);
            }
        }
    }
}

function processStatusEffectsOnTurn(character) {
    if (character.hp <= 0) return;
    if (!character.statusEffects) character.statusEffects = [];
    if(character.statusEffects.some(e => e.name === 'poison')) {
        const poisonDamage = Math.floor(character.maxHp * 0.05);
        character.hp = Math.max(0, character.hp - poisonDamage);
        logMessage(`${t(character.name_key)} takes ${poisonDamage} poison damage.`);
        if (character.hp <= 0) animateDefeat(character);
    }
    if(character.statusEffects.some(e => e.name === 'regen')) {
        const regenAmount = Math.floor(character.maxHp * 0.1);
        heal(character, regenAmount);
        logMessage(`${t(character.name_key)} recovers ${regenAmount} HP from Regen.`);
    }
   
    if (character.isPlayer) {
        if (!character.onCooldown) character.onCooldown = [];
        for (let i = character.onCooldown.length - 1; i >= 0; i--) {
            const cd = character.onCooldown[i];
            cd.turns--;
            if (cd.turns <= 0) {
                character.onCooldown.splice(i, 1);
            }
        }
    }
}

function processATB(deltaTime) {
    if (isActionInProgress) return;
    allCharacters.forEach(char => {
        if (char.hp > 0 && char.atb < 100) {
            let atbGain = char.speed * deltaTime;
            if (char.statusEffects.some(e => e.name === 'slow')) atbGain /= 2;
            if (char.statusEffects.some(e => e.name === 'haste')) atbGain *= 1.5;
            if (char.statusEffects.some(e => ['stun', 'petrify', 'jumping'].includes(e.name))) atbGain = 0;

            char.atb = Math.min(100, char.atb + atbGain);
            if (char.atb >= 100 && !actionQueue.includes(char)) actionQueue.push(char);
        }
    });
    updateStatusUI();
}

function processActionQueue() {
    if (activeCharacter || isActionInProgress || actionQueue.length === 0) return;
    activeCharacter = actionQueue.shift();
    if (activeCharacter.hp <= 0) { endTurn(); return; }
   
    isActionInProgress = true;
    processStatusEffectsOnTurn(activeCharacter);
    if (activeCharacter.hp <= 0) {
        endTurn();
        return;
    }
   
    if (activeCharacter.statusEffects.some(e => ['stun', 'petrify'].includes(e.name))) {
        logMessage(`${t(activeCharacter.name_key)} can't move!`);
        endTurn();
        return;
    }
   
    if (activeCharacter.isPlayer) {
        const turnIndicator = document.getElementById('turn-indicator');
        if(turnIndicator) turnIndicator.innerText = t(activeCharacter.name_key) + t('turn');

        if (turnIndicatorPointer) {
            const activeSpritePos = activeCharacter.sprite.position;
            turnIndicatorPointer.position.set(activeSpritePos.x, activeSpritePos.y + 1.5, activeSpritePos.z);
            turnIndicatorPointer.userData.originalY = activeSpritePos.y + 1.5;
            turnIndicatorPointer.visible = true;
        }
        updateCommandBox();
        document.getElementById('command-box').style.display = 'block';
        commandState = 'main';
        currentSelectionIndex = 0;
        updateCursorVisual();
        isActionInProgress = false;
    } else {
        setTimeout(enemyAction, 1000);
    }
}

function endTurn() {
    const character = activeCharacter;
    activeCharacter = null;
    if (targetingCursor) targetingCursor.visible = false;
    if (turnIndicatorPointer) turnIndicatorPointer.visible = false;

    setTimeout(() => {
        if (checkVictory()) return;
        logMessage('', false);
        if (character) {
            if (character.name_key === 'megumin' && character.hp === 1) {
                character.atb = -200;
            } else if (!character.statusEffects.some(e => e.name === 'jumping')) {
                character.atb = 0;
            }
        }
        isActionInProgress = false;
        commandState = 'main';
    }, 1500);
}

function checkVictory() {
    if (enemies.every(e => e.hp <= 0) || party.every(p => p.hp <= 0)) {
        isActionInProgress = true;
        const msg = (enemies.every(e => e.hp <= 0)) ? t('victory') : t('game_over');
        const log = (enemies.every(e => e.hp <= 0)) ? `${t('giant_toad')}${t('enemies_defeated')}` : t('party_defeated');
        logMessage(log);
        setTimeout(() => showGameOver(msg), 2000);
        return true;
    }
    return false;
}

// --- Player Actions ---
// --- プレイヤーのアクション ---
// This block contains all logic for handling player input, from opening menus (handleCommand)
// to executing attacks (playerAttack), skills (playerUseAbility), and summons.
// このブロックには、メニューを開く（handleCommand）から、攻撃（playerAttack）、
// スキル（playerUseAbility）、召喚の実行まで、プレイヤーの入力を処理するすべてのロジックが含まれています。
function handleCommand(action) {
    if (['defend', 'limit'].includes(action)) {
        executePlayerAction(() => {
            if (action === 'defend') playerDefend();
            if (action === 'limit') playerUseLimit();
        });
    } else if (action === 'attack') {
        startTargeting('attack_target');
    } else {
        hideAllSubMenus();
        commandState = action;
        currentSelectionIndex = 0;
        const box = document.getElementById(`${action}-box`);
        const list = document.getElementById(`${action}-list`);
        if (!list) { console.error(`List for action "${action}" not found!`); return; }

        list.innerHTML = '';
        let items = [];

        if (action === 'skill') items = activeCharacter.skills;
        else if (action === 'magic') items = activeCharacter.spells;
        else if (action === 'item') items = inventory.filter(i => i.quantity > 0);
        else if (action === 'summon') items = guardianForces;

        items.forEach((item) => {
            const li = document.createElement('li');
            const onCooldown = activeCharacter.onCooldown.find(cd => cd.name === item.name_key);
           
            let costText = '';
            if (onCooldown) {
                costText = `CD: ${cd.turns}`;
                li.classList.add('disabled');
            }
            else if (item.cost && (action === 'skill' || action === 'magic')) {
                costText = `${item.cost} MP`;
            } else if (item.quantity) {
                costText = `x${item.quantity}`;
            } else if (item.cost && action === 'summon') {
                costText = `${item.cost} GF`;
            }

            li.innerHTML = `<span class="cursor"></span>
                                <span class="lang" data-key="${item.name_key}">${t(item.name_key)}</span>
                                <span style="float: right; color: #ccc;">${costText}</span>`;
           
            if (!onCooldown) {
                li.addEventListener('mouseenter', () => {
                    const descKey = `${item.name_key}_desc`;
                    const desc = TRANSLATIONS[currentLanguage][descKey] || TRANSLATIONS.en[descKey] || '';
                    logMessage(desc, desc !== '');
                   
                    const allItems = Array.from(list.children);
                    currentSelectionIndex = allItems.indexOf(li);
                    updateCursorVisual();
                });
                li.addEventListener('mouseleave', () => logMessage('', false));
                li.onclick = () => {
                    if (action === 'summon') executePlayerAction(() => playerSummonGF(item));
                    else if (action === 'item') { selectedItem = item; startTargeting('item_target'); }
                    else { selectedAbility = item; handleAbilityTargeting(item); }
                };
            }
            list.appendChild(li);
        });
        box.style.display = 'block';
        updateCursorVisual();
    }
}

function executePlayerAction(actionCallback) {
    isActionInProgress = true;
    hideCommandUI();
    actionCallback();
}

function handleAbilityTargeting(ability) {
    const targetType = ability.type;
    if (targetType.includes('_enemy')) startTargeting('ability_enemy_target');
    else if (targetType.includes('_party')) executePlayerAction(() => playerUseAbility(ability, party));
    else if (targetType.includes('_self')) executePlayerAction(() => playerUseAbility(ability, activeCharacter));
    else if (targetType.includes('healing') || targetType.includes('revive')) startTargeting('ability_party_target');
}

function startTargeting(state, data = null) {
    isActionInProgress = false;
    commandState = 'target-box';
    currentTargetingState = state;
    currentTargetSelectionIndex = 0;
    hideAllSubMenus();
   
    const targetBox = document.getElementById('target-box');
    const targetList = targetBox.querySelector('ul');
    targetList.innerHTML = '';

    let targets = [];
    if (state.includes('_enemy') || state === 'attack_target' || state === 'limit_enemy_target') {
        targets = enemies.filter(e => e.hp > 0 && !e.statusEffects.some(s => s.name === 'jumping'));
    } else {
        const isRevive = selectedAbility?.type === 'revive';
        const isItem = currentTargetingState === 'item_target';
        targets = party.filter(p => (isRevive || isItem) ? true : p.hp > 0);
    }
   
    if (targets.length === 0) {
        logMessage(t('no_valid_targets'));
        setTimeout(() => {
            commandState = 'main';
            document.getElementById('command-box').style.display = 'block';
            hideAllSubMenus();
            if (targetingCursor) targetingCursor.visible = false;
        }, 1000);
        return;
    }

    targets.forEach((target, index) => {
        const li = document.createElement('li');
        const targetName = target.isPlayer ? t(target.name_key) : `${t(target.name_key)} #${target.id + 1}`;
        li.innerHTML = `<span class="cursor"></span><span>${targetName}</span>`;
        li.onclick = () => {
            document.dispatchEvent(new CustomEvent('targetSelected', { detail: { target: target, data: data, state: state }}));
        };
        li.addEventListener('mouseenter', () => {
            currentTargetSelectionIndex = index;
            updateTargetingCursorVisual();
        });
        targetList.appendChild(li);
    });
   
    targetBox.style.display = 'block';
    updateCursorVisual();
    updateTargetingCursor();
}

function playerAttack(target) {
    activeCharacter.defending = false;
    logMessage(`${t(activeCharacter.name_key)} ${t('attacks')}!`);
    gfGauge = Math.min(100, gfGauge + 5);
    updateGfGaugeUI();
    animateAttack(activeCharacter, target, () => {
        let damage = (activeCharacter.name_key === "darkness") ? 0 : Math.floor(activeCharacter.attack * (Math.random() * 0.2 + 0.9));
        const attackUp = activeCharacter.statusEffects.find(e => e.name === 'attack_up');
        if (attackUp) damage += attackUp.power;
       
        if (damage === 0) {
            logMessage(t('misses'));
        } else {
            const dealtDamage = takeDamage(target, damage);
            logMessage(`${t(target.name_key)} #${target.id + 1} ${dealtDamage} ${t('takes_damage')}`);
        }
       
        if (target.hp <= 0) {
            animateDefeat(target);
        }
       
        endTurn();
    });
}

function playerUseAbility(ability, target) {
    if (activeCharacter.mp < (ability.cost || 0)) { logMessage(t('not_enough_mp')); endTurn(); return; }
    
    activeCharacter.defending = false;
    activeCharacter.mp -= (ability.cost || 0);
    if (ability.cooldown > 0) {
        activeCharacter.onCooldown.push({ name: ability.name_key, turns: ability.cooldown });
    }
   
    logMessage(`${t(activeCharacter.name_key)} ${t('uses')} ${t(ability.name_key)}!`);

    const onAnimationComplete = () => {
        switch (ability.name_key) {
            case 'snipe':
            case 'freeze':
            case 'sacred_turn_undead':
                let damage = Math.floor(ability.power * (Math.random() * 0.2 + 0.9));
                const dealtDamage = takeDamage(target, damage);
                if (target.hp <= 0) animateDefeat(target);
                logMessage(`${t(target.name_key)} #${target.id + 1} ${dealtDamage} ${t('takes_damage')}`);
                break;
            case 'drain_touch':
                let drainDamage = Math.floor(ability.power * (Math.random() * 0.2 + 0.9));
                const drainedAmount = takeDamage(target, drainDamage);
                heal(activeCharacter, Math.floor(drainedAmount / 2));
                if (target.hp <= 0) animateDefeat(target);
                logMessage(`${t(target.name_key)} #${target.id + 1} ${drainedAmount} ${t('takes_damage')}`);
                break;
            case 'steal':
                animateSkill(target.sprite);
                if (Math.random() < (activeCharacter.luk / 50 + 0.1)) { target.defenseDebuff = true; logMessage(`${t(target.name_key)} #${target.id + 1}${t('steal_msg')}`); }
                else { logMessage(t('steal_fail')); }
                break;
            case 'blessing':
                logMessage(t('blessing_msg'));
                logMessage(t('regen_party_msg'));
                target.forEach(p => { 
                    if (p.hp > 0) {
                        p.luk += ability.power;
                        p.statusEffects.push({name: 'regen', turns: 3});
                    }
                });
                break;
            case 'taunt':
                enemies.forEach(e => { if(e.hp > 0) e.isTauntedBy = activeCharacter; });
                logMessage(`${t(activeCharacter.name_key)} ${t('taunt_msg')}`);
                break;
            case 'cover':
                target.statusEffects.push({name: 'covering', turns: 3});
                logMessage(`${t(target.name_key)} ${t('cover_msg')}`);
                break;
            case 'immovable_fortress':
                target.statusEffects.push({name: 'defense_up', turns: 3, power: 60});
                logMessage(`${t(target.name_key)} ${t('defense_up_msg')}`);
                break;
            case 'party_trick':
                target.forEach(p => {
                    if (p.hp > 0) {
                        restoreMp(p, ability.mpRecover);
                        p.limit = Math.min(100, p.limit + ability.limitGain);
                        p.statusEffects.push({name: 'limit_boost', turns: 3});
                    }
                });
                logMessage(t('party_trick_msg'));
                break;
            case 'focus':
                logMessage(t(meguminFocusQuotes[Math.floor(Math.random() * meguminFocusQuotes.length)]));
                target.limit = Math.min(100, target.limit + 50);
                break;
            case 'summoning_chant':
                logMessage(t('dark_power_gathers'));
                gfGauge = Math.min(100, gfGauge + 50);
                updateGfGaugeUI();
                break;
            case 'purification':
                target.statusEffects = [];
                logMessage(`${t(target.name_key)} ${t('purification_msg')}`);
                break;
            case 'eagle_eye':
                target.statusEffects.push({name: 'crit_rate_up', turns: 3, power: 50});
                logMessage(`${t(target.name_key)} ${t('eagle_eye_msg')}`);
                break;
            case 'heal_wind':
                if (target.hp > 0) { 
                    target.statusEffects.push({name: 'regen', turns: 3, power: ability.power});
                    logMessage(`${t(target.name_key)} is regenerating HP.`); 
                } else { 
                    logMessage(t('cast_on_dead')); 
                }
                break;
            case 'resurrection':
                if (target.hp <= 0) { 
                    target.hp = target.maxHp / 2;
                    animateRevive(target);
                    logMessage(`${t(target.name_key)} is revived!`);
                } else { 
                    logMessage(t('resurrect_dead')); 
                }
                break;
            default:
                let defaultDamage = Math.floor((ability.power || 0) * (Math.random() * 0.2 + 0.9));
                const dealtDefaultDamage = takeDamage(target, defaultDamage);
                if (target.hp <= 0) animateDefeat(target);
                logMessage(`${t(target.name_key)} #${target.id + 1} ${dealtDefaultDamage} ${t('takes_damage')}`);
                break;
        }
        endTurn();
    };

    switch(ability.name_key) {
        case 'snipe': animateSnipe(target, onAnimationComplete); break;
        case 'freeze': animateFreeze(target, onAnimationComplete); break;
        case 'sacred_turn_undead': animateSacred(target.sprite, onAnimationComplete); break;
        case 'drain_touch': animateDrain(target.sprite, activeCharacter.sprite, onAnimationComplete); break;
        case 'heal_wind':
        case 'resurrection':
        case 'purification': animateHeal(target.sprite, onAnimationComplete); break;
        case 'blessing': 
        case 'party_trick':
            party.forEach(p => p.hp > 0 && animateBuff(p.sprite, { color: 0xFFFFE0 }));
            setTimeout(onAnimationComplete, 800);
            break;
        case 'taunt': animateBuff(activeCharacter.sprite, { color: 0xffa500 }); setTimeout(onAnimationComplete, 800); break;
        case 'cover': animateBuff(activeCharacter.sprite, { color: 0x808080 }); setTimeout(onAnimationComplete, 800); break;
        case 'immovable_fortress': animateBuff(activeCharacter.sprite, { color: 0x8B4513 }); setTimeout(onAnimationComplete, 800); break;
        case 'eagle_eye': animateBuff(activeCharacter.sprite, { color: 0xFFD700 }); setTimeout(onAnimationComplete, 800); break;
        case 'focus':
        case 'summoning_chant': animateBuff(activeCharacter.sprite, { color: 0x9400D3 }); setTimeout(onAnimationComplete, 800); break;
        default: animateCasting(activeCharacter, onAnimationComplete); break;
    }
}

function playerDefend() {
    activeCharacter.defending = true;
    gfGauge = Math.min(100, gfGauge + 10);
    updateGfGaugeUI();
    logMessage(`${t(activeCharacter.name_key)} ${t('defends')}`);
    endTurn();
}

function playerSummonGF(gf) {
    if (gfGauge < gf.cost) { logMessage(t('not_enough_gf')); endTurn(); return; }
    activeCharacter.defending = false;
    gfGauge = 0;
    updateGfGaugeUI();
    showBraveFrontierAnimation(gf, () => {
        gf.effect();
        endTurn();
    });
}

// --- Limit Breaks & Minigames ---
// --- リミットブレイクとミニゲーム ---
// Logic for handling each character's ultimate "Limit Break" abilities,
// including triggering any associated minigames like the roulette or timing bar.
// 各キャラクターの究極の「リミットブレイク」アビリティを処理するロジック。
// ルーレットやタイミングバーなどの関連するミニゲームのトリガーも含まれます。
function playerUseLimit() {
    const ability = activeCharacter.limitBreak;
    activeCharacter.defending = false;
    activeCharacter.limit = 0;
    showBraveFrontierAnimation(activeCharacter, () => {
        logMessage(`${t(activeCharacter.name_key)} ${t('uses')} ${t(ability.name_key)}!`);
        switch(ability.name_key) {
            case 'masochistic_guard':
                activeCharacter.defending = true; 
                activeCharacter.statusEffects.push({name: 'defense_up', turns: 3, power: 80 });
                enemies.forEach(e => { if(e.hp > 0) e.isTauntedBy = activeCharacter; });
                animateGlow(activeCharacter.sprite); logMessage(t('masochistic_guard_msg'));
                endTurn();
                break;
            case 'god_blow':
                startAquaRoulette(multiplier => {
                    if (multiplier > 0) {
                        const damage = ability.power * multiplier;
                        startTargeting('limit_enemy_target', { damage: damage, abilityName: 'god_blow' });
                    } else {
                        logMessage(t('miss_attack'));
                        endTurn();
                    }
                });
                break;
            case 'chunchunmaru':
                startTidusMinigame(3, (perfects) => {
                    if (perfects >= 3) {
                        logMessage(t('death_slash'));
                        animateScreenSlash();
                        if (Math.random() < 0.33) {
                            enemies.forEach(e => {
                                if(e.hp > 0) {
                                    e.hp = 0;
                                    logMessage(`${t(e.name_key)} #${e.id+1} ${t('instant_kill_msg')}`);
                                    animateDefeat(e);
                                }
                            });
                        } else {
                            logMessage(t('death_slash_fail'));
                        }
                        endTurn();
                    } else if (perfects === 2) {
                        logMessage(t('blunt_strike'));
                        startTargeting('limit_enemy_target', { damage: 180 });
                    } else if (perfects === 1) {
                        logMessage(t('noob_slash'));
                        startTargeting('limit_enemy_target', { damage: 80 });
                    } else {
                        logMessage(t('kazuma_trip_msg'));
                        endTurn();
                    }
                });
                break;
            case 'explosion':
                startTidusMinigame(1, (perfects) => {
                    const power = perfects > 0 ? ability.power : Math.floor(ability.power * 0.5);
                    animateMagic(null, { isExplosion: true }); cameraShake();
                    enemies.forEach(e => {
                        if (e.hp > 0) {
                            takeDamage(e, power); 
                            if (e.hp <= 0) animateDefeat(e);
                        }
                    });
                    logMessage(`Enemies take ${power} damage!`);
                    activeCharacter.hp = 1; 
                    activeCharacter.mp = 1;
                    endTurn();
                });
                break;
        }
    });
}

function startTidusMinigame(totalTriggers, callback) {
    const container = createMinigameContainer();
    let perfects = 0;
    let currentTrigger = 0;

    function nextTrigger() {
        if (currentTrigger >= totalTriggers) {
            container.remove();
            callback(perfects);
            return;
        }
        currentTrigger++;
        container.innerHTML = `
            <div id="tidus-bar" style="width: 300px; height: 30px; background: #555; border: 2px solid #fff; position: relative; overflow: hidden;">
                <div id="tidus-sweet-spot" style="position: absolute; left: 70%; top: 0; width: 15%; height: 100%; background: yellow;"></div>
                <div id="tidus-cursor" style="position: absolute; left: 0%; top: -5px; width: 4px; height: 40px; background: red;"></div>
            </div>
            <button id="minigame-btn" class="minigame-button">${t('minigame_tap')}</button>
        `;
        const btn = document.getElementById('minigame-btn');
        const cursor = document.getElementById('tidus-cursor');
        let position = 0, speed = 1.5;
        let animFrame;

        function moveCursor() {
            position += speed;
            if (position > 100 || position < 0) speed *= -1;
            cursor.style.left = `${position}%`;
            animFrame = requestAnimationFrame(moveCursor);
        }
        moveCursor();
       
        const keydownListener = (e) => {
            if (e.code === 'Space' || e.code === 'Enter') actionListener(e);
        };

        const actionListener = (e) => {
            e.preventDefault();
            cancelAnimationFrame(animFrame);
            if (position > 70 && position < 85) {
                logMessage(t('perfect'));
                perfects++;
            } else {
                logMessage(t('good'));
            }
            container.innerHTML = '';
            window.removeEventListener('keydown', keydownListener);
            btn.removeEventListener('click', actionListener);
            btn.removeEventListener('touchstart', actionListener);
            setTimeout(nextTrigger, 200);
        };

        btn.addEventListener('click', actionListener, { once: true });
        btn.addEventListener('touchstart', actionListener, { once: true });
        window.addEventListener('keydown', keydownListener, { once: true });
    }
    nextTrigger();
}

function startAquaRoulette(callback) {
    const container = createMinigameContainer();
    container.innerHTML = `
        <div id="aqua-slots" style="display: flex; gap: 10px; font-size: 24px;">
            <div class="aqua-slot" style="width: 80px; height: 40px; border: 2px solid #fff; text-align: center; line-height: 40px; overflow: hidden;"></div>
            <div class="aqua-slot" style="width: 80px; height: 40px; border: 2px solid #fff; text-align: center; line-height: 40px; overflow: hidden;"></div>
            <div class="aqua-slot" style="width: 80px; height: 40px; border: 2px solid #fff; text-align: center; line-height: 40px; overflow: hidden;"></div>
        </div>
        <button id="minigame-btn" class="minigame-button">${t('minigame_stop')}</button>
    `;

    const slots = document.querySelectorAll('.aqua-slot');
    const options = [t('minigame_miss'), t('minigame_good'), t('minigame_yeah')];
    const intervals = [];
    let stoppedCount = 0;
    const btn = document.getElementById('minigame-btn');

    const keyListener = (e) => {
        if(e.code === 'Space' || e.code === 'Enter') actionListener(e);
    };

    const actionListener = (e) => {
        e.preventDefault();
        if (stoppedCount < slots.length) {
            clearInterval(intervals[stoppedCount]);
            stoppedCount++;
            if (stoppedCount === slots.length) {
                let multiplier = 0;
                const results = Array.from(slots).map(s => s.textContent);
                if (results.every(r => r === t('minigame_miss'))) {
                    multiplier = 0;
                } else if (results.every(r => r === t('minigame_yeah'))) {
                    multiplier = 5.0;
                } else {
                    multiplier = 1.0;
                    results.forEach(res => { if (res === t('minigame_yeah')) multiplier += 1.0; if (res === t('minigame_good')) multiplier += 0.5; });
                }
               
                logMessage(multiplier > 0 ? `${t('damage_multiplier')} ${multiplier.toFixed(1)}!` : t('miss_attack'));
                window.removeEventListener('keydown', keyListener);
                btn.removeEventListener('click', actionListener);
                btn.removeEventListener('touchstart', actionListener);
               
                setTimeout(() => {
                    container.remove();
                    callback(multiplier);
                }, 500);
            }
        }
    };
   
    slots.forEach((slot, index) => {
        intervals[index] = setInterval(() => { slot.textContent = options[Math.floor(Math.random() * options.length)]; }, 80);
    });
   
    btn.addEventListener('click', actionListener);
    btn.addEventListener('touchstart', actionListener);
    window.addEventListener('keydown', keyListener);
}

function createMinigameContainer() {
    const container = document.createElement('div');
    container.style.cssText = `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 100; background: rgba(10, 20, 100, 0.9); padding: 20px; border: 4px solid #fff; box-shadow: 0 0 0 4px #5a5a5a; display: flex; flex-direction: column; align-items: center;`;
    document.getElementById('game-container').appendChild(container);
    return container;
}

// --- Enemy Actions ---
// --- 敵のアクション ---
// This section defines the AI for the enemies. It determines whether they use a normal attack
// or a special skill, and who they target.
// このセクションでは、敵のAIを定義します。通常攻撃と特殊スキルのどちらを使用するか、
// そして誰をターゲットにするかを決定します。
function enemyAction() {
    const livingParty = party.filter(p => p.hp > 0);
    if (livingParty.length === 0) { checkVictory(); return; }
   
    const isJumping = activeCharacter.statusEffects.find(e => e.name === 'jumping');
    if (isJumping) {
        endTurn();
        return;
    }

    const skill = activeCharacter.skills && activeCharacter.skills.find(s => Math.random() < s.chance);

    if (skill) {
        let target = livingParty[Math.floor(Math.random() * livingParty.length)];
        if (activeCharacter.isTauntedBy && activeCharacter.isTauntedBy.hp > 0) {
            target = activeCharacter.isTauntedBy;
        }

        logMessage(`${t(activeCharacter.name_key)} #${activeCharacter.id + 1} uses ${t(skill.name_key)}!`);
       
        if (skill.type === 'aoe_slow') { 
            animateTongueLash(activeCharacter, livingParty, () => {
                livingParty.forEach(p => {
                    const damage = Math.floor(skill.power * (Math.random() * 0.2 + 0.9));
                    const dealtDamage = takeDamage(p, damage);
                    if (p.hp <= 0) animateDefeat(p);
                    if (Math.random() < 0.15) { 
                        const existingSlow = p.statusEffects.find(e => e.name === 'slow');
                        if (existingSlow) {
                            existingSlow.turns = 2; 
                            existingSlow.timer = 2 * 2;
                        } else {
                            p.statusEffects.push({name: 'slow', turns: 2}); 
                        }
                        logMessage(`${t(p.name_key)} ${dealtDamage} ${t('takes_damage')} ${t('and_is_slowed')}`);
                    } else {
                        logMessage(`${t(p.name_key)} ${dealtDamage} ${t('takes_damage')}`);
                    }
                });
                endTurn();
            });
        } else if (skill.type === 'jump_attack') {
            logMessage(`${t(activeCharacter.name_key)} #${activeCharacter.id + 1} ${t('jump_msg')}`);
            activeCharacter.statusEffects.push({ name: 'jumping', turns: 2 });
            animateJump(activeCharacter, endTurn);
        } else if (skill.type === 'physical_poison') {
            animateAttack(activeCharacter, target, () => {
                const damage = Math.floor(skill.power * (Math.random() * 0.2 + 0.9));
                const dealtDamage = takeDamage(target, damage);
                if (target.hp <= 0) animateDefeat(target);
                if (Math.random() < 0.4) {
                    target.statusEffects.push({name: 'poison', turns: 3});
                    logMessage(`${t(target.name_key)} ${dealtDamage} ${t('takes_damage')} ${t('and_is_poisoned')}`);
                } else {
                    logMessage(`${t(target.name_key)} ${dealtDamage} ${t('takes_damage')}`);
                }
                endTurn();
            });
        }
    } else { // Normal attack
        let target;
        if (activeCharacter.isTauntedBy && activeCharacter.isTauntedBy.hp > 0) {
            target = activeCharacter.isTauntedBy;
        } else {
            target = livingParty[Math.floor(Math.random() * livingParty.length)];
        }
       
        const darkness = party.find(p => p.name_key === 'darkness');
        if (target.name_key !== 'darkness' && darkness && darkness.hp > 0 && darkness.statusEffects.some(e => e.name === 'covering')) {
            if (Math.random() < 0.75) { 
                logMessage(t('cover_proc_msg'));
                animateCover(activeCharacter, target, darkness, () => {
                    const damage = Math.floor(activeCharacter.attack * (Math.random() * 0.2 + 0.9));
                    const dealtDamage = takeDamage(darkness, damage);
                    if(darkness.hp <= 0) animateDefeat(darkness);
                    logMessage(`${t(darkness.name_key)} ${dealtDamage} ${t('takes_damage')}`);
                    endTurn();
                });
                return;
            }
        }
        logMessage(`${t(activeCharacter.name_key)} #${activeCharacter.id + 1} ${t('attacks')} ${t(target.name_key)}!`);
        animateAttack(activeCharacter, target, () => {
            const damage = Math.floor(activeCharacter.attack * (Math.random() * 0.2 + 0.9));
            const dealtDamage = takeDamage(target, damage);
            if(target.hp <= 0) animateDefeat(target);
            logMessage(`${t(target.name_key)} ${dealtDamage} ${t('takes_damage')}`);
            endTurn();
        });
    }
}

// --- UI & Controls ---
// --- UIとコントロール ---
// This block handles all user interface setup, updates, and keyboard/mouse controls.
// It manages how the UI boxes are displayed and how the player navigates through menus.
// このブロックは、すべてのユーザーインターフェースのセットアップ、更新、およびキーボード/マウス操作を処理します。
// UIボックスの表示方法や、プレイヤーがメニューをどのように操作するかを管理します。
function setupUI() {
    document.getElementById('command-list').addEventListener('click', (e) => {
        let targetLi = e.target.closest('li');
        if (!targetLi || !activeCharacter || targetLi.classList.contains('disabled') || isActionInProgress) return;
        handleCommand(targetLi.dataset.action);
    });
    document.getElementById('language-toggle').addEventListener('click', () => {
        currentLanguage = (currentLanguage === 'en') ? 'jp' : 'en';
        document.getElementById('language-toggle').innerText = currentLanguage.toUpperCase();
        updateAllText();
    });
    document.addEventListener('targetSelected', (e) => {
        const { target, data, state } = e.detail;
        isActionInProgress = true;
        hideAllSubMenus();
        targetingCursor.visible = false;
        if (state === 'limit_enemy_target') {
            if (data.abilityName === 'god_blow') {
                animateAttack(activeCharacter, target, () => {
                    animateExplosionVFX(target.sprite);
                    cameraShake();
                    const dealtDamage = takeDamage(target, data.damage);
                    if (target.hp <= 0) animateDefeat(target);
                    logMessage(`${t(target.name_key)} #${target.id + 1} ${Math.floor(dealtDamage)} ${t('takes_damage')}`);
                    endTurn();
                });
            } else { 
                if (data.damage !== undefined && data.damage > 0) {
                    const dealtDamage = takeDamage(target, data.damage);
                    if (target.hp <= 0) animateDefeat(target);
                    logMessage(`${t(target.name_key)} #${target.id + 1} ${Math.floor(dealtDamage)} ${t('takes_damage')}`);
                }
                endTurn();
            }
        } else if (state === 'item_target') {
            const success = selectedItem.effect(target);
            if (success) inventory.find(i => i.name_key === selectedItem.name_key).quantity--;
            endTurn();
        } else if (state.includes('ability')) {
            playerUseAbility(selectedAbility, target);
        } else if (state === 'attack_target') {
            playerAttack(target);
        }
    });
   
    document.querySelectorAll('#command-box li').forEach((li) => {
        li.addEventListener('mouseenter', () => {
            if (commandState === 'main') {
                const allItems = Array.from(li.parentElement.children);
                currentSelectionIndex = allItems.indexOf(li);
                updateCursorVisual();
            }
        });
    });
}

function setupHotkeys() {
    window.addEventListener('keydown', (e) => {
        if (isActionInProgress || !activeCharacter) return;
        if (commandState === 'target-box') handleTargetingKeys(e);
        else handleMenuKeys(e);
    });
}

function handleMenuKeys(e) {
    const currentBox = document.getElementById(`${commandState}-box`);
    if (!currentBox || currentBox.style.display === 'none') return;

    const allItems = Array.from(currentBox.querySelectorAll('ul li'));
    if (allItems.length === 0) return;

    e.preventDefault();

    let direction = 0;
    if (e.key === 'ArrowUp' || e.key === 'w') {
        direction = -1;
    } else if (e.key === 'ArrowDown' || e.key === 's') {
        direction = 1;
    } else if (e.key === 'Enter' || e.code === 'Space') {
        if (allItems[currentSelectionIndex] && !allItems[currentSelectionIndex].classList.contains('disabled')) {
            allItems[currentSelectionIndex].click();
        }
        return;
    } else if (e.code === 'Escape' || e.code === 'Backspace') {
        if (commandState !== 'main') {
            hideAllSubMenus();
            commandState = 'main';
            currentSelectionIndex = 0; 
            updateCursorVisual();
        }
        return;
    }

    if (direction !== 0) {
        let newIndex = currentSelectionIndex;
        let attempts = 0;
        do {
            newIndex = (newIndex + direction + allItems.length) % allItems.length;
            attempts++;
        } while (allItems[newIndex].classList.contains('disabled') && attempts < allItems.length);
       
        if (!allItems[newIndex].classList.contains('disabled')) {
            currentSelectionIndex = newIndex;
        }
    }
   
    updateCursorVisual();
}

function handleTargetingKeys(e) {
    e.preventDefault();
    const targetBox = document.getElementById('target-box');
    const targets = targetBox.querySelectorAll('ul li');
    if (targets.length === 0) return;

    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'ArrowLeft' || e.key === 'a') {
        currentTargetSelectionIndex = (currentTargetSelectionIndex > 0) ? currentTargetSelectionIndex - 1 : targets.length - 1;
    }
    if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'ArrowRight' || e.key === 'd') {
        currentTargetSelectionIndex = (currentTargetSelectionIndex < targets.length - 1) ? currentTargetSelectionIndex + 1 : 0;
    }
   
    if (e.code === 'Enter' || e.code === 'Space') {
        targets[currentTargetSelectionIndex].click();
    }
    if (e.code === 'Escape' || e.code === 'Backspace') {
        isActionInProgress = false;
        commandState = 'main';
        document.getElementById('command-box').style.display = 'block';
        hideAllSubMenus();
        targetingCursor.visible = false;
    }
    updateTargetingCursorVisual();
}

function setupTargeting() {
    const cursorGeo = new THREE.ConeGeometry(0.3, 0.5, 4);
    cursorGeo.rotateX(Math.PI);
    const cursorMat = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    targetingCursor = new THREE.Mesh(cursorGeo, cursorMat);
    targetingCursor.userData = {};
    targetingCursor.visible = false;
    scene.add(targetingCursor);

    const pointerGeo = new THREE.ConeGeometry(0.2, 0.4, 3);
    pointerGeo.rotateX(Math.PI);
    const pointerMat = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    turnIndicatorPointer = new THREE.Mesh(pointerGeo, pointerMat);
    turnIndicatorPointer.userData = {};
    turnIndicatorPointer.visible = false;
    scene.add(turnIndicatorPointer);
}

function hideCommandUI() {
    document.getElementById('command-box').style.display = 'none';
    hideAllSubMenus();
}

function hideAllSubMenus() {
    ['skill-box', 'magic-box', 'item-box', 'summon-box', 'target-box'].forEach(id => {
        const box = document.getElementById(id);
        if (box) box.style.display = 'none';
    });
}

function updateCommandBox() {
    const cmdList = document.getElementById('command-list');
    if (!cmdList || !activeCharacter) return;
    const skillButton = cmdList.querySelector('[data-action="skill"]');
    if (skillButton) skillButton.classList.toggle('disabled', activeCharacter.skills.length === 0);
   
    const magicButton = cmdList.querySelector('[data-action="magic"]');
    if (magicButton) magicButton.classList.toggle('disabled', activeCharacter.spells.length === 0);
   
    const limitButton = cmdList.querySelector('[data-action="limit"]');
    if (limitButton) {
        limitButton.classList.toggle('disabled', activeCharacter.limit < 100);
        limitButton.classList.toggle('limit-ready', activeCharacter.limit >= 100);
    }
   
    const summonButton = cmdList.querySelector('[data-action="summon"]');
    if (summonButton) summonButton.classList.toggle('disabled', gfGauge < 100);
   
    updateAllText();
}

function updateAllText() {
    document.querySelectorAll('.lang').forEach(el => {
        const key = el.dataset.key;
        if(key) el.innerText = t(key);
    });
    if(activeCharacter && activeCharacter.isPlayer) {
        const turnIndicator = document.getElementById('turn-indicator');
        if (turnIndicator) turnIndicator.innerText = t(activeCharacter.name_key) + t('turn');
    }
    updateStatusUI();
}

function getCharacterStatusColor(character) {
    if (character.hp <= 0) return '#ff5555';
    if (character.statusEffects.some(e => e.name === 'petrify')) return '#999999';
    if (character.statusEffects.some(e => e.name === 'poison')) return '#aa88ff';
    if (character.statusEffects.some(e => e.name === 'stun')) return '#ffd700';
    if (character.statusEffects.some(e => e.name === 'slow')) return '#6699ff';
    return '#ffffff';
}

function updateStatusUI() {
    const list = document.getElementById('party-status-list');
    if (list) {
        list.innerHTML = party.map(p => {
            const nameColor = getCharacterStatusColor(p);
            return `
            <li style="opacity: ${p.hp <= 0 ? '0.6' : '1'}">
                <span style="color: ${nameColor};">${t(p.name_key)}</span>
                <span>HP: ${p.hp}/${p.maxHp}</span>
                <span>MP: ${p.mp}/${p.maxMp}</span>
                <div class="bar-container">
                    <div class="bar-fill atb-bar-fill" style="width:${p.atb}%"></div>
                </div>
                <div class="bar-container">
                    <div class="bar-fill limit-bar-fill" style="width:${p.limit}%"></div>
                </div>
            </li>`;
        }).join('');
    }
}

function updateGfGaugeUI() {
    const gauge = document.getElementById('gf-gauge-fill');
    if (gauge) gauge.style.width = `${gfGauge}%`;
}

function logMessage(msg, show = true) {
    const mb = document.getElementById('message-box');
    const p = mb.querySelector('p');
    if (p) {
        p.textContent = msg;
        mb.style.display = show ? 'block' : 'none';
    }
}

function showGameOver(text) {
    const go = document.getElementById('game-over');
    if(go) {
        go.innerText = text;
        go.style.display = 'block';
    }
}

function updateCursorVisual() {
    document.querySelectorAll('.ui-box ul li').forEach(li => li.classList.remove('selected'));
   
    const state = commandState.includes('target') ? 'target' : commandState;
    const currentBox = document.getElementById(`${state}-box`);
    if (!currentBox || currentBox.style.display === 'none') return;

    const allItems = Array.from(currentBox.querySelectorAll('ul li'));
   
    let indexToSelect = commandState.includes('target') ? currentTargetSelectionIndex : currentSelectionIndex;
   
    if (allItems[indexToSelect]) {
        allItems[indexToSelect].classList.add('selected');
    }
}

function updateTargetingCursorVisual() {
    updateCursorVisual();
    updateTargetingCursor();
}

function updateTargetingCursor() {
    let targets;
    if (currentTargetingState.includes('_enemy') || currentTargetingState === 'attack_target' || currentTargetingState === 'limit_enemy_target') {
        targets = enemies.filter(en => en.hp > 0 && !en.statusEffects.some(s => s.name === 'jumping'));
    } else { 
        const isRevive = selectedAbility?.type === 'revive';
        const isItem = currentTargetingState === 'item_target';
        targets = party.filter(p => (isRevive || isItem) ? true : p.hp > 0);
    }
   
    if(targets.length > 0) {
        if(currentTargetSelectionIndex >= targets.length) currentTargetSelectionIndex = 0;
        const target = targets[currentTargetSelectionIndex];
        if (target && target.sprite) {
            targetingCursor.position.set(target.sprite.position.x, target.sprite.position.y + 1.5, target.sprite.position.z);
            targetingCursor.userData.originalY = target.sprite.position.y + 1.5;
            targetingCursor.visible = true;
        } else {
            targetingCursor.visible = false;
        }
    } else {
        targetingCursor.visible = false;
    }
}

// --- Animation & Effects ---
// --- アニメーションとエフェクト ---
// This section contains all the functions that create visual effects for attacks, spells, and other actions.
// They use the TWEEN.js library to smoothly animate sprites and particles.
// このセクションには、攻撃、魔法、その他のアクションの視覚効果を作成するすべての関数が含まれています。
// TWEEN.jsライブラリを使用して、スプライトやパーティクルをスムーズにアニメーションさせます。
function animateAttack(attacker, target, onHitCallback) {
    const originalPos = attacker.sprite.userData.originalPos.clone();
    const targetPos = target.sprite.position;
    const attackPos = new THREE.Vector3().lerpVectors(originalPos, targetPos, 0.7);
    new TWEEN.Tween(attacker.sprite.position).to(attackPos, 150)
        .onComplete(() => { 
            onHitCallback(); 
            if (target && target.hp > 0 && target.sprite.visible) {
                const hitPos = target.sprite.position.clone();
                new TWEEN.Tween(target.sprite.position).to({x: hitPos.x + 0.1, y: hitPos.y - 0.1}, 50).yoyo(true).repeat(1).start();
            }
            new TWEEN.Tween(attacker.sprite.position).to(originalPos, 300).start(); 
        })
        .start();
}

function animateCover(attacker, originalTarget, coverer, onHitCallback) {
    const covererOriginalPos = coverer.sprite.userData.originalPos.clone();
    const coverPos = new THREE.Vector3().lerpVectors(covererOriginalPos, originalTarget.sprite.position, 0.5);
   
    new TWEEN.Tween(coverer.sprite.position).to(coverPos, 100).onComplete(() => {
        animateAttack(attacker, coverer, () => {
            onHitCallback();
            new TWEEN.Tween(coverer.sprite.position).to(covererOriginalPos, 300).delay(200).start();
        });
    }).start();
}

function animateCasting(caster, onCastCallback, delay = 1000) {
    const particleMat = new THREE.SpriteMaterial({ color: 0xffff00, transparent: true, opacity: 0.8 });
    const particles = [];
    for (let i = 0; i < 20; i++) {
        const particle = new THREE.Sprite(particleMat);
        particle.scale.set(0.1, 0.1, 1);
        const angle = (i / 20) * Math.PI * 2;
        particle.position.set(caster.sprite.position.x + Math.cos(angle), caster.sprite.position.y - 0.5 + Math.sin(angle), caster.sprite.position.z);
        particles.push(particle);
        scene.add(particle);
        new TWEEN.Tween(particle.position)
            .to({x: caster.sprite.position.x, y: caster.sprite.position.y, z: caster.sprite.position.z}, delay)
            .easing(TWEEN.Easing.Quadratic.In)
            .start();
        new TWEEN.Tween(particle.material).to({ opacity: 0 }, delay).start();
    }
    setTimeout(() => {
        particles.forEach(p => scene.remove(p));
        onCastCallback();
    }, delay);
}

function animateFreeze(target, onHit) {
    const iceColor = 0xADD8E6;
    const originalColor = target.sprite.material.color.clone();
    new TWEEN.Tween(target.sprite.material.color)
        .to({ r: 0.8, g: 0.9, b: 1 }, 100)
        .yoyo(true)
        .repeat(3)
        .onComplete(() => target.sprite.material.color.copy(originalColor))
        .start();

    for (let i = 0; i < 15; i++) {
        const shardMat = new THREE.SpriteMaterial({ color: iceColor, transparent: true, opacity: 0.9 });
        const shard = new THREE.Sprite(shardMat);
        const size = Math.random() * 0.4 + 0.1;
        shard.scale.set(size * 0.2, size, 1);
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 1.5 + 0.5;
        shard.position.set(
            target.sprite.position.x + Math.cos(angle) * radius,
            target.sprite.position.y + Math.sin(angle) * radius,
            target.sprite.position.z + 1
        );
        shard.rotation.z = angle + Math.PI / 2;
        scene.add(shard);

        new TWEEN.Tween(shard.material)
            .to({ opacity: 0 }, 500)
            .delay(300)
            .onComplete(() => scene.remove(shard))
            .start();
    }
   
    setTimeout(onHit, 800);
}

function animateGlow(sprite) {
    const glowSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: sprite.material.map, color: 0xffff00, blending: THREE.AdditiveBlending, transparent: true, opacity: 0.7 }));
    glowSprite.scale.copy(sprite.scale);
    sprite.add(glowSprite);
    const tween = new TWEEN.Tween(glowSprite.scale).to({ x: sprite.scale.x * 1.2, y: sprite.scale.y * 1.2 }, 1000).yoyo(true).repeat(Infinity).start();
    const checkGlow = setInterval(() => {
        const darkness = party.find(p => p.name_key === "darkness");
        if (!darkness || !darkness.defending) {
            tween.stop();
            sprite.remove(glowSprite);
            clearInterval(checkGlow);
        }
    }, 500);
}

function animateDefeat(character) {
    const sprite = character.sprite;
    new TWEEN.Tween(sprite.material).to({ opacity: 0 }, 500)
        .onComplete(() => sprite.visible = false)
        .start();
}

function animateRevive(character) {
    const sprite = character.sprite;
    sprite.visible = true;
    new TWEEN.Tween(sprite.material).to({ opacity: 1 }, 500).start();
}

function animateSkill(sprite, color = 0xffffff) {
    const flashSprite = new THREE.Sprite(new THREE.SpriteMaterial({
        color: color,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.8
    }));
    flashSprite.scale.set(sprite.scale.x * 1.5, sprite.scale.y * 1.5, 1);
    flashSprite.position.copy(sprite.position);
    scene.add(flashSprite);
    new TWEEN.Tween(flashSprite.material).to({ opacity: 0 }, 300).onComplete(() => scene.remove(flashSprite)).start();
}

function animateSnipe(target, onHit) {
    const crosshair = document.createElement('div');
    crosshair.style.cssText = `
        position: absolute; width: 100px; height: 100px; z-index: 100;
        transform: translate(-50%, -50%) scale(2); transition: transform 0.5s ease-out, opacity 0.5s;
        opacity: 0; border: 2px solid red; border-radius: 50%; box-sizing: border-box;`;
    crosshair.innerHTML = `
        <div style="position: absolute; top: 50%; left: 10%; width: 80%; height: 2px; background: red; transform: translateY(-50%);"></div>
        <div style="position: absolute; left: 50%; top: 10%; height: 80%; width: 2px; background: red; transform: translateX(-50%);"></div>`;

    const targetPos = toScreenPosition(target.sprite, camera);
    crosshair.style.left = `${targetPos.x}px`;
    crosshair.style.top = `${targetPos.y}px`;
    document.getElementById('game-container').appendChild(crosshair);

    setTimeout(() => {
        crosshair.style.transform = 'translate(-50%, -50%) scale(1)';
        crosshair.style.opacity = '1';
    }, 100);

    setTimeout(() => {
        onHit();
        crosshair.style.opacity = '0';
        setTimeout(() => crosshair.remove(), 500);
    }, 1000);
}

function toScreenPosition(obj, camera){
    var vector = new THREE.Vector3();
    obj.getWorldPosition(vector);
    vector.project(camera);
    vector.x = (vector.x + 1) * window.innerWidth / 2;
    vector.y = -(vector.y - 1) * window.innerHeight / 2;
    return vector;
}

function animateMagic(targetSprite, { isExplosion = false, color = 0x8888ff }) {
    if (isExplosion) {
        const flash = document.createElement('div');
        flash.style.cssText = `position: absolute; top: 0; left: 0; width: 100vw; height: 100vh; background: white; z-index: 200; opacity: 1; transition: opacity 1.5s; pointer-events: none;`;
        document.body.appendChild(flash);
        setTimeout(() => flash.style.opacity = 0, 50);
        setTimeout(() => flash.remove(), 2000);
    }
    if (targetSprite) {
        for (let i = 0; i < 20; i++) {
            const particleMat = new THREE.SpriteMaterial({ color: color, transparent: true });
            const particle = new THREE.Sprite(particleMat);
            particle.scale.set(0.2, 0.2, 1);
            const targetPos = targetSprite.position;
            particle.position.set(targetPos.x + (Math.random() - 0.5) * 2, targetPos.y + 2 + (Math.random() - 0.5) * 2, targetPos.z + 1);
            scene.add(particle);
            new TWEEN.Tween(particle.position).to({ y: targetPos.y, x: targetPos.x + (Math.random() - 0.5) * 2 }, 800).easing(TWEEN.Easing.Quadratic.Out).start();
            new TWEEN.Tween(particle.material).to({ opacity: 0 }, 800).onComplete(() => scene.remove(particle)).start();
        }
    }
}

function animateHeal(targetSprite, onComplete) {
    const color = 0x88ff88;
    for (let i = 0; i < 25; i++) {
        const particleMat = new THREE.SpriteMaterial({ color: color, transparent: true, opacity: 0.9 });
        const particle = new THREE.Sprite(particleMat);
        particle.scale.set(0.15, 0.15, 1);
        const targetPos = targetSprite.position;
        particle.position.set(targetPos.x + (Math.random() - 0.5) * 1.5, targetPos.y - 1, targetPos.z);
        scene.add(particle);
        new TWEEN.Tween(particle.position)
            .to({ y: targetPos.y + 1.5, x: targetPos.x + (Math.random() - 0.5) }, 800)
            .easing(TWEEN.Easing.Quadratic.Out).start();
        new TWEEN.Tween(particle.material)
            .to({ opacity: 0 }, 800)
            .onComplete(() => scene.remove(particle)).start();
    }
    setTimeout(onComplete, 800);
}

function animateSacred(targetSprite, onComplete) {
    const lightbeamMat = new THREE.SpriteMaterial({ color: 0xffffaa, transparent: true, blending: THREE.AdditiveBlending, opacity: 0.7 });
    const lightbeam = new THREE.Sprite(lightbeamMat);
    lightbeam.scale.set(1.5, 5, 1);
    const targetPos = targetSprite.position;
    lightbeam.position.set(targetPos.x, targetPos.y + lightbeam.scale.y / 2 - 1, targetPos.z);
    scene.add(lightbeam);

    new TWEEN.Tween(lightbeam.scale).to({ x: 2, y: 5.5 }, 400).yoyo(true).repeat(1).start();
    new TWEEN.Tween(lightbeam.material).to({ opacity: 0 }, 800).onComplete(() => scene.remove(lightbeam)).start();
    setTimeout(onComplete, 800);
}

function animateDrain(targetSprite, casterSprite, onComplete) {
    for (let i = 0; i < 20; i++) {
        const particleMat = new THREE.SpriteMaterial({ color: 0xff4444, transparent: true });
        const particle = new THREE.Sprite(particleMat);
        particle.scale.set(0.1, 0.1, 1);
        particle.position.copy(targetSprite.position);
        scene.add(particle);
        new TWEEN.Tween(particle.position)
            .to({ x: casterSprite.position.x, y: casterSprite.position.y }, 600)
            .easing(TWEEN.Easing.Quadratic.In)
            .onComplete(() => scene.remove(particle))
            .start();
    }
    setTimeout(onComplete, 600);
}

function animateBuff(targetSprite, { color = 0xaaaaff } = {}) {
    for (let i = 0; i < 20; i++) {
        const particleMat = new THREE.SpriteMaterial({ color: color, transparent: true, opacity: 0.9 });
        const particle = new THREE.Sprite(particleMat);
        particle.scale.set(0.1, 0.1, 1);
        const targetPos = targetSprite.position;
        particle.position.set(targetPos.x + (Math.random() - 0.5), targetPos.y - 1, targetPos.z);
        scene.add(particle);
        new TWEEN.Tween(particle.position)
            .to({ y: targetPos.y + 1, x: targetPos.x + (Math.random() - 0.5) * 2 }, 800)
            .easing(TWEEN.Easing.Quadratic.Out).start();
        new TWEEN.Tween(particle.material)
            .to({ opacity: 0 }, 800)
            .onComplete(() => scene.remove(particle)).start();
    }
}

function animateTongueLash(attacker, targets, onComplete) {
    targets.forEach(target => {
        if (target.hp <= 0) return;
        const tongueGeo = new THREE.PlaneGeometry(1, 0.1);
        const tongueMat = new THREE.MeshBasicMaterial({ color: 0xff8888, side: THREE.DoubleSide });
        const tongue = new THREE.Mesh(tongueGeo, tongueMat);
       
        const startPos = attacker.sprite.position;
        const endPos = target.sprite.position;
       
        const distance = startPos.distanceTo(endPos);
        const angle = Math.atan2(endPos.y - startPos.y, endPos.x - startPos.x);

        tongue.scale.x = distance;
        tongue.rotation.z = angle;
        tongue.position.lerpVectors(startPos, endPos, 0.5);

        scene.add(tongue);
        new TWEEN.Tween(tongue.scale).to({ x: 0 }, 300).delay(200).onComplete(() => scene.remove(tongue)).start();
    });
    setTimeout(onComplete, 500);
}

function animateJump(character, onComplete) {
    const sprite = character.sprite;
    new TWEEN.Tween(sprite.position)
        .to({ y: sprite.position.y + 8 }, 400)
        .easing(TWEEN.Easing.Quadratic.In)
        .onComplete(() => {
            sprite.visible = false;
            onComplete();
        })
        .start();
}

function animateLand(character, target, onComplete) {
    const sprite = character.sprite;
    sprite.position.y = target.sprite.position.y + 8;
    sprite.position.x = target.sprite.position.x;
    sprite.visible = true;

    new TWEEN.Tween(sprite.position)
        .to({ y: target.sprite.position.y }, 250)
        .easing(TWEEN.Easing.Bounce.Out)
        .onComplete(() => {
            cameraShake();
            new TWEEN.Tween(sprite.position).to(sprite.userData.originalPos, 400).start();
            onComplete();
        })
        .start();
}

function animateExplosionVFX(targetSprite) {
    for (let i = 0; i < 40; i++) {
        const isYellow = Math.random() > 0.5;
        const particleMat = new THREE.SpriteMaterial({ 
            color: isYellow ? 0xffff00 : 0xffffff, 
            transparent: true, 
            blending: THREE.AdditiveBlending 
        });
        const particle = new THREE.Sprite(particleMat);
        const size = Math.random() * 0.4 + 0.2;
        particle.scale.set(size, size, 1);
        particle.position.copy(targetSprite.position);
       
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 2;
       
        scene.add(particle);

        new TWEEN.Tween(particle.position)
            .to({ 
                x: particle.position.x + Math.cos(angle) * distance, 
                y: particle.position.y + Math.sin(angle) * distance 
            }, 500)
            .easing(TWEEN.Easing.Quadratic.Out)
            .start();
           
        new TWEEN.Tween(particle.material)
            .to({ opacity: 0 }, 500)
            .onComplete(() => scene.remove(particle))
            .start();
    }
}

function animatePartyAura() {
    const auraMat = new THREE.SpriteMaterial({ 
        color: 0xffe4b5, 
        transparent: true, 
        blending: THREE.AdditiveBlending,
        opacity: 0.6
    });
    const aura = new THREE.Sprite(auraMat);
    aura.scale.set(1, 1, 1);
   
    aura.position.set(3.5, -1, -1); 
    scene.add(aura);

    new TWEEN.Tween(aura.scale)
        .to({ x: 12, y: 12, z: 12 }, 800)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();
   
    new TWEEN.Tween(aura.material)
        .to({ opacity: 0 }, 900)
        .onComplete(() => scene.remove(aura))
        .start();
}

function animateScreenSlash() {
    const slash = document.createElement('div');
    slash.style.cssText = `
        position: absolute; top: 50%; left: -10%; width: 120%; height: 10px;
        background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%);
        transform: translateY(-50%) rotate(-30deg) scaleX(0); transform-origin: left;
        transition: transform 0.2s ease-out; z-index: 200;`;
    document.body.appendChild(slash);
    setTimeout(() => {
        slash.style.transform = 'translateY(-50%) rotate(-30deg) scaleX(1)';
    }, 50);
    setTimeout(() => {
        slash.remove();
    }, 500);
}

function cameraShake() { new TWEEN.Tween(camera.position).to({ x: camera.position.x + 0.2, y: camera.position.y - 0.2 }, 50).yoyo(true).repeat(5).onComplete(()=> camera.position.set(0,0,10)).start(); }

function showBraveFrontierAnimation(character, callback) {
    const container = document.createElement('div');
    container.style.cssText = `position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; background: rgba(0,0,0,0.5); z-index: 99; overflow: hidden; pointer-events: none;`;
    const img = document.createElement('img');
    img.src = ASSETS[character.name_key.toUpperCase()];
    img.style.cssText = `max-width: 80%; max-height: 80%; border: 5px solid gold; border-radius: 15px; transform: translateX(-120%); transition: transform 0.5s ease-out;`;
    container.appendChild(img);
    document.body.appendChild(container);
    setTimeout(() => { img.style.transform = 'translateX(0)'; }, 100);
    setTimeout(() => {
        callback();
        img.style.transform = 'translateX(120%)';
        setTimeout(() => container.remove(), 500);
    }, 1500);
}

// --- Final Initialization ---
// --- 最終初期化 ---
// This line waits for the HTML document to be fully loaded before running the `init` function to start the game.
// この行は、HTMLドキュメントが完全に読み込まれるのを待ってから、`init`関数を実行してゲームを開始します。
window.addEventListener('DOMContentLoaded', init);