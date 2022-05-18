import styles from "./Notice.module.scss";
import { NoticeProps } from "./Notice.types";

/**
 * Notice component
 */
const Notice = ({message}:NoticeProps) => {
    return(
        <div className={styles['notice']}>
            <p>{message}</p>
        </div>
    )
}

export default Notice;