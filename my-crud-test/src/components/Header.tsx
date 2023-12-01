interface HeaderProps {
  openModalAdd: () => void;
}

export const Header: React.FC<HeaderProps> = ({ openModalAdd }) => {

  return (
      <div className="content">
        <button
          className="btn btn-primary content-btn"
          onClick={openModalAdd}
        >
          Create New Post
        </button>
      </div>
  )
};
