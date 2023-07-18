const MenuItem = (props) => {
    return (
        <div className={`col rounded-0 btn btn-${props.color} ${props.selectedMenu === `${props.id}` ? 'active' : ''}`} id={props.id} onClick={props.handleSelectMenu}>{props.name}</div>
    );
}

export default MenuItem;