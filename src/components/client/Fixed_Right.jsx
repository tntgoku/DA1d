import { NumberWeb } from "../../entity/Marco";

const FixedRight =()=>{
    return (
        <div className="fixed-right">
            <a href="https://www.facebook.com/" target="_blank" title="Messenger">
            <img src="https://bizweb.dktcdn.net/100/176/601/themes/984546/assets/icon-menu-right1.png?1757670314036" alt="" /></a>
            <a href="https://www.figma.com/files/team/1302660958073699454/recents-and-sharing?fuid=1302660956424604794" target="_blank" title="Zalo">
            <img src="https://bizweb.dktcdn.net/100/176/601/themes/984546/assets/icon-menu-right2.png?1757670314036" alt="" /></a>
            <a href={`tel:${NumberWeb}`} target="_blank" rel="noopener noreferrer" title="phone">
            <img src="https://bizweb.dktcdn.net/100/176/601/themes/984546/assets/icon-menu-right3.png?1757670314036" alt="" /></a>
        </div>
    );
};

export default FixedRight;