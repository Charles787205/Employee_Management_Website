import Image from "next/image";
import Link from "next/link";
type sidePanelProps = {
  handleClick: Function;
};
const SidePanel = ({ handleClick }: sidePanelProps) => {
  return (
    <div className="side-panel">
      <Image
        src="/profile.png"
        width={150}
        height={150}
        alt="profile picture"
        className="profile-pic"
      />
      <h2>John Doe</h2>
      <ul>
        <Link href="/admin/employee/">
          <li>Employees</li>
        </Link>
        <Link href="/admin/employee/add">
          <li>Add Employees</li>
        </Link>
        <Link href="/admin/department">
          <li
            onClick={(e) => {
              handleClick("add department");
            }}
          >
            Add Department
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default SidePanel;
