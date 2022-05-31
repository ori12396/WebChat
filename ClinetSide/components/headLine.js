import Davatar from './Davatar.png'
function HeadLine({c}) {

    return (
        <li className="clearfix-parent"  >
        <div className="child"><img
                src={Davatar}
                className="avatar"
            /></div>
            
            <div className="child">
                {c.name}
            </div>
        </li>
    );

}
export default HeadLine;