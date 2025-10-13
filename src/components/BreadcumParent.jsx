export   const renderParents = (parents) => {
    if (!parents || parents.length === 0) return null;

    return parents.map((parent, index) => (
      <li key={parent.id} className="home">
        <Link to={`/${parent.slug}`} className="changeurl">
          {parent.name}
        </Link>
        <i className="fa-solid fa-chevron-right"></i>
        {/* Nếu parent này có cha tiếp */}
        {renderParents(parent.parents)}
      </li>
    ));
  };