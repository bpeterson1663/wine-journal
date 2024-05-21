import { Avatar, Burger, Button, Container, Group, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import styles from "components/nav-bar/nav-bar.module.css";
import { useAppSelector } from "features/hooks";
import { useMobile } from "hooks/useMobile";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
	const [opened, { toggle }] = useDisclosure();
	const navigate = useNavigate();
	const isMobile = useMobile();
	const { currentUser } = useAppSelector((state) => state.auth);
	const { userProfile } = useAppSelector((state) => state.user);

	function getInitials() {
		const first = userProfile?.firstName[0] ?? "";
		const last = userProfile?.lastName[0] ?? "";
		return `${first}${last}`;
	}

	function handleNavigate(url: string) {
		navigate(url);
	}

	function renderNavItems() {
		if (isMobile && currentUser) {
			return (
				<Group justify="flex-end">
					<Menu shadow="md" width={200} onClose={toggle}>
						<Menu.Target>
							<Burger
								className={styles["menu-icon"]}
								color="white"
								opened={opened}
								onClick={toggle}
								aria-label="Open Menu"
							/>
						</Menu.Target>

						<Menu.Dropdown>
							<Menu.Item onClick={() => handleNavigate("/")}>Home</Menu.Item>
							<Menu.Item onClick={() => handleNavigate("/tastings")}>
								Tastings
							</Menu.Item>
							<Menu.Item onClick={() => handleNavigate("/cellar")}>
								Cellar
							</Menu.Item>
							<Menu.Divider />
							<Menu.Item onClick={() => handleNavigate("/profile")}>
								Profile
							</Menu.Item>
						</Menu.Dropdown>
					</Menu>
				</Group>
			);
		}

		if (currentUser) {
			return (
				<Container className={styles.inner} fluid>
					<Group>
						<Button onClick={() => handleNavigate("/")}>Home</Button>
						<Button onClick={() => handleNavigate("/tastings")}>
							Tastings
						</Button>
						<Button onClick={() => handleNavigate("/cellar")}>Cellar</Button>
					</Group>
					<Group justify="flex-end">
						<Avatar
							color="white"
							component={Link}
							to="/profile"
							className={`${styles.icon} ${styles["nav-link"]}`}
							radius="xl"
						>
							{getInitials()}
						</Avatar>
					</Group>
				</Container>
			);
		}

		return null;
	}

	return <header className={styles["nav-bar"]}>{renderNavItems()}</header>;
};

export default NavBar;
