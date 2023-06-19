import { Dropdown, Navbar, Avatar } from "flowbite-react";
import { LogoNavbar } from "..";

export default function NavigasiBar() {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <LogoNavbar />
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Navbar.Collapse
        >
          <Navbar.Link  href="/">
            <p>Home</p>
          </Navbar.Link>
          <Navbar.Link href="/transaction-page">Transaction Data</Navbar.Link>

          <Dropdown inline label={<Avatar  alt="User settings" rounded />}>
            <Dropdown.Header>
              <span className="block text-sm">Bonnie Green</span>
              <span className="block truncate text-sm font-medium">
                name@flowbite.com
              </span>
            </Dropdown.Header>
            <Dropdown.Item>Transaction</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
