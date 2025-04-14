import images from "../constants/images.js";
import styles from "../css/Emoji.module.css";

function Emoji({attempts, status}) {
    const imageSrc = status === 'lose' ? images[2] : images[attempts] || images[0];
    return (
        <div className={styles.emoji}>
            <img src={imageSrc} alt="emoji" className={styles.img}/>
        </div>
    );
}

export default Emoji;