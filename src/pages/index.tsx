import React, { useEffect, useState } from "react";
// Custom Hooks
import { useLocation } from "@src/util/hooks";
// NextJS
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
// import Interface
import { UserInfo, Location } from "@src/core/interface";
import styles from "./index.module.scss";
// API Methods
import { getMyProfile } from "@src/core/api/user";
// import Components
import { ProfileHeader, Room } from "@src/components/primary";
import { getNearChatrooms } from "@src/core/api/chatroom";
// import Mapbox By Dynamic
const MapBox = dynamic(() => import("@src/components/mapbox/Map"), {
	ssr: false,
});

export default function MainPage(): JSX.Element {
	const [myLocation] = useLocation();
	const [chatrooms, setChatroms] = useState([]);
	const [me, setMe] = useState<UserInfo>(undefined);
	const router = useRouter();

	// Get User Data
	// Should be called Once
	useEffect(() => {
		getUserData();
		async function getUserData() {
			try {
				const data = await getMyProfile();
				setMe(data);
			} catch (err) {
				router.push("/signin");
			}
		}
	}, []);

	// Get Chatrooms
	useEffect(() => {
		if (myLocation) {
			getChatrooms(myLocation);
		}
		async function getChatrooms(location: Location) {
			try {
				const data = await getNearChatrooms(location);
				setChatroms(data);
			} catch (err) {
				window.alert(err);
			}
		}
	}, [myLocation]);

	// Return JSX
	return (
		<div className={styles.container}>
			{/* rendering mapbox */}
			{myLocation && <MapBox className={styles.map} location={myLocation} />}
			{/* rendering profileheader */}
			{myLocation && <ProfileHeader className={styles.profile} user={me} />}
			{/* rendering joinable rooms */}
			{myLocation && (
				<Room className={styles.bottombar} chatrooms={chatrooms} />
			)}
		</div>
	);
}

// export async function getServerSideProps(
// 	ctx,
// ): Promise<GetServerSidePropsResult<any>> {
// 	const data = await getMyProfile();
// 	return {
// 		props: {
// 			data,
// 		},
// 	};
// }
