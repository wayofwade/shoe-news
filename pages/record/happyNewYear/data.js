// 。！？分割
const soupListStr = ["新年的钟声即将敲响，愿它带给你无尽的喜悦和幸福，新的一年里，愿你事事顺心，笑口常开。","愿新年的阳光洒满你的世界，照亮你的每一个梦想，让你的生活充满希望和温暖。","新的一年，愿你拥有健康的体魄，愉快的心情，事业有成，家庭和睦，幸福安康。","岁月如歌，新年又至，愿你在新的一年里，所有的努力都能开花结果，所有的梦想都能照进现实。","新春佳节，愿你的生活如诗如画，工作顺顺利利，家庭甜甜蜜蜜，幸福伴你左右。","愿新年的钟声带走你所有的烦恼和忧愁，带来无尽的欢乐和幸福，让你的每一天都充满阳光。","新的一年，愿你勇往直前，无所畏惧，追求自己的梦想，实现自己的价值。","春风送暖入屠苏，新年到来万象新。愿你在新的一年里，步步高升，财源广进，心想事成。","新春佳节，愿你的笑容比花儿更灿烂，心情比蜜糖还甜，幸福如影随形，快乐伴你每一天。","愿新年的阳光带给你无尽的希望和勇气，让你在新的一年里创造更多的辉煌和成就。","新的一年，愿你心怀梦想，脚踏实地，用汗水和智慧书写属于自己的精彩篇章。","岁月不居，时节如流，愿你在新的一年里珍惜时光，把握机遇，成就更好的自己。","新春佳节，愿你的家庭充满温馨和幸福，亲朋好友欢聚一堂，共度美好时光。","愿新年的钟声敲响时，你所有的心愿都能实现，所有的梦想都能成真，生活更加美好。","新的一年，愿你身体健康，工作顺利，学业有成，家庭和睦，幸福满满。","新春之际，愿你拥有更多的勇气和力量，面对生活的挑战，勇往直前，无所畏惧。","愿新年的阳光带给你温暖和力量，让你在新的一年里充满活力和激情，迎接每一个挑战。","新的一年，愿你与爱人携手共进，共创美好未来，爱情甜蜜，幸福美满。","新春佳节，愿你的心中充满爱与和平，传递正能量，让周围的人都能感受到你的温暖和关怀。","愿新年的钟声带给你无尽的喜悦和惊喜，让你的生活更加丰富多彩，充满无限可能。","... (中间部分继续，以下直接跳到后半部分)","","新年到来，愿你像一颗璀璨的星星，在人生的舞台上绽放光芒，照亮自己的同时也温暖他人。","愿你在新的一年里，不仅成就自己的梦想，也能帮助他人实现梦想，让世界因你而更加美好。","新春佳节，愿你的心灵得到净化，抛开一切烦恼和杂念，享受宁静与和谐的美好时光。","新年到来之际，愿你的每一步都走得坚定而有力，向着自己的目标不断前进，直到成功。","愿你在新的一年里，不仅事业有成，家庭和睦，还能拥有更多的朋友和知己，共同分享生活的喜怒哀乐。","... (继续)","","新的一年，愿你保持一颗年轻的心，对世界充满好奇和热爱，不断探索未知的领域。","新春佳节，愿你的心灵得到滋养，拥有更多的智慧和洞察力，看待事物更加全面和深刻。","愿新年的阳光带给你新的灵感和创意，让你在工作和生活中都能展现出独特的魅力和才华。","新的一年，愿你学会放下过去，珍惜现在，拥抱未来，用积极的心态面对生活的每一个挑战。","新春佳节，愿你的心中充满感恩和善良，对他人多一份理解和宽容，让这个世界因你而更加温暖。","愿新年的钟声成为你前进的号角，激励你不断追求更高的目标和更远的梦想。","新的一年，愿你勇敢地走出舒适区，尝试新的事物，挑战自己的极限，创造更多的可能。","新春佳节，愿你的家庭充满欢声笑语，每一个成员都能感受到家的温暖和幸福。","愿你在新的一年里，不仅实现个人的价值，也能为社会做出更多的贡献，成为社会的栋梁之才。","新年到来之际，愿你拥有满满的幸福和喜悦，让这份美好的心情伴随你度过每一个美好的瞬间，直到永远。"]

const list1 =["新的一年，愿你的生活如诗般优雅，工作似歌般动听，幸福如影随形，每一天都充满阳光与欢笑。","愿新年的钟声敲响你心中的美好愿景，让你的每一个梦想都能在新的一年里逐渐实现，收获满满的喜悦与成就。","新春佳节之际，愿你的生活充满温馨与甜蜜，家庭和睦，事业有成，每一天都过得充实而有意义。","新的一年，愿你的心灵得到真正的放松与滋养，面对挑战时更加坚韧不拔，享受生活中的每一个小确幸。","愿新年的第一缕阳光带给你无尽的希望与勇气，让你在追求梦想的路上更加坚定，收获更多的成长与收获。","新春佳节，愿你的笑容比花儿更灿烂，心情比蜜糖还甜，与亲朋好友共度美好时光，留下难忘的回忆。","新的一年，愿你的每一天都充满爱与被爱，让这份爱成为你前进的动力，也是你归宿的港湾。","愿新年的你，拥有更多的自信与勇气，敢于尝试新事物，挑战自我，不断突破自己的极限。","新春佳节，愿你的生活如同五彩斑斓的画卷，每一笔都充满色彩与活力，让人生更加精彩纷呈。","新的一年，愿你的心灵得到净化与升华，以更加平和的心态面对生活的起起伏伏，享受内心的宁静与和谐。","","新年到来，愿你的心灵像大海一样宽广，能够包容世间万物，用善良和宽容去感染身边的每一个人。","愿新年的你，成为自己生命中最耀眼的星，无论走到哪里都能散发出独特的光芒，照亮自己的同时也温暖他人。","新春佳节，愿你的每一个梦想都能找到归宿，每一份努力都能得到回报，收获满满的幸福与满足。","新的一年，愿你在成长的道路上不断前行，勇敢面对每一个挑战，用智慧和勇气书写属于自己的辉煌篇章。","愿新年的钟声带走你所有的烦恼与忧愁，只留下快乐和幸福，让你的每一天都过得轻松愉悦。","","新的一年，愿你在人生的旅途中不断发现美好，珍惜每一个与你相遇的人，共同创造更多温馨与感动的瞬间。"]




module.exports = {
    soupListStr: soupListStr.concat(list1)
}