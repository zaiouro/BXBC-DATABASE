// ==========================================================================
// CHARACTER DATA ASSET - DOMINIC CANTON (生還者專屬格式對齊版)
// ==========================================================================

const currentCharacterData = {
    name: "DOMINIC CANTON",
    alias: "DOM",
    gender: "Male",
    age: "Unknown", 
    died: "N/A (Alive)", 
    killer: "None",
    status: "Remnant Researcher",
    titleColor: "#00e676",
    pfp: "pfp/pfp6.png",
    
    // 路由分流關鍵字：指出 Dominic 屬於生還者 [ ALIVE ] 分類
    isAliveSubject: true,

    quote: "The trace of remnants leads to answers they tried to bury deep below.",

    // 💡 欄位清理：創作者文字未提及，留空使網頁自動將其移除，拒絕雜亂
    purpose: "",
    
    // 💡 智慧排版修正：字字與創作者原文完全一致！但使用雙換行 (\\n\\n) 精準拆成三段，使畫面清晰好讀
    bg: "Dominic or known as DOM is another hurricane Utah murderer. Like afton, he had discovered remnant, and has already done tests on others including himself. He actually was the reason why Chuck E. Cheese and Freddy's merged into one company, all because he made a deal with Afton. It's unknown if Dom sees Afton as a co-worker, or an enemy.\n\nHowever, he once was a loving father who ran a Chuck E. Cheese with David Woodside, aka Chuck and Costume's father, however, Dom was replaced from being an assistant manager, so he killed half of Chuck's family, and still continues to kill.\n\nHis daughter was abducted one day by a lab organization, and he hasn't seen her since.",
    
    // 遵循前述指令：同一人不需要暱稱，直接顯示白天與黑夜的行為模式
    pers: "<strong>[ Day ]</strong>\nDriven by revenge and scientific obsession. Highly unpredictable and calculated.\n\n<strong>[ Night ]</strong>\nViews others as test subjects for remnant data. Bitterly obsessed with Afton's methods.",
    
    // 💡 欄位清理：創作者文字未提及，留空使網頁自動將其移除
    likes: "",
    
    dislikes: "",
    
    // 💡 完美對齊：保留創作者提及的關係，並使用換行分隔兩大主體
    rel: "<strong>William Afton:</strong> He made a deal with Afton, which was the reason why Chuck E. Cheese and Freddy's merged into one company. It's unknown if Dom sees Afton as a co-worker, or an enemy.\n\n<strong>The Animatronics:</strong> The animatronics will likely view Dom as an enemy later on whenever he gets used more in this au.",
    
    // 💡 欄位清理：創作者文字未提及，留空使網頁自動將其移除
    notes: ""
};