export function LpChatMock() {
  return (
    <figure className="lp-chat-mock" aria-label="שיחה לדוגמה">
      <div className="lp-chat-mock-card">
        <div className="lp-chat-mock-bar">
          <span className="lp-chat-mock-avatar" aria-hidden />
          <span className="lp-chat-mock-who">
            <strong>לקוח</strong>
            <span>מחובר</span>
          </span>
        </div>
        <div className="lp-chat-thread">
          <p className="lp-wa-in">
            היי, ראיתי את המודעה
            <time>18:41</time>
          </p>
          <p className="lp-wa-out">
            היי, אפשר לעזור.
            <time>18:41</time>
          </p>
          <p className="lp-wa-out">
            מה הצורך, ומתי?
            <time>18:41</time>
          </p>
          <p className="lp-wa-hot">ליד חם</p>
        </div>
      </div>
    </figure>
  );
}

export function LpFlowMock() {
  return (
    <figure className="lp-flow-mock" aria-label="תהליך לדוגמה">
      <div className="lp-flow-mock-track">
        <span>פנייה</span>
        <span className="lp-flow-mock-line" aria-hidden />
        <span>מערכת</span>
        <span className="lp-flow-mock-line" aria-hidden />
        <span>צוות</span>
        <i className="lp-flow-mock-dot" aria-hidden />
      </div>
      <ul className="lp-flow-mock-log">
        <li>
          <b>פנייה</b>
          <span>נכנסה</span>
        </li>
        <li>
          <b>מערכת</b>
          <span>עדכנה סטטוס</span>
        </li>
        <li>
          <b>צוות</b>
          <span>קיבל את הליד</span>
        </li>
      </ul>
      <figcaption>תהליך אחד. רץ לבד.</figcaption>
    </figure>
  );
}
