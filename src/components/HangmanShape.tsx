import styles from './HangmanShape.module.css'
import {ReactNode} from "react";

const HEAD : ReactNode = <div key={1} className={styles.head}></div>
const BODY : ReactNode = <div  key={2} className={styles.body}></div>
const RIGHTARM : ReactNode = <div key={3} className={`${styles.arm} ${styles.right}`}></div>
const LEFTARM : ReactNode = <div key={4} className={`${styles.arm} ${styles.left}`}></div>
const RIGHTFOOT : ReactNode = <div key={5} className={`${styles.foot} ${styles['right-foot']}`}></div>
const LEFTFOOT : ReactNode = <div key={6} className={`${styles.foot} ${styles['left-foot']}`}></div>

const BODY_PART : ReactNode[] = [HEAD, BODY, RIGHTARM, LEFTARM, RIGHTFOOT, LEFTFOOT]

type HangmanShapeProps = {
    wrongWordLength: number
}
const HangmanShape = (props : HangmanShapeProps) => {
    return <div className={styles.wrapper}>
        <div className={styles.top}></div>
        <div className={styles.rod}></div>
        <div className={styles.bottom}></div>
        <div className={styles.gallows}>
            <div className={styles["top-bottom"]}></div>
            {BODY_PART.slice(0, props.wrongWordLength)}
        </div>
    </div>
}

export default HangmanShape;