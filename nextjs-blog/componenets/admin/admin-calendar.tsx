import Donations from "./admin-donations";
import { Donation, User } from "@prisma/client";

export interface UserDonation {
    donation: Donation;
    user: User;
}

const getDonations = async (): Promise<{ donations: Donation[] }> => {
    const res = await fetch("http://localhost:3000/api/donations", {
        method: "GET",
    });
    return res.json();
};

const getUsersByIds = async (userIds: string[]): Promise<{ users: User[] }> => {
    const searchParams = userIds.map((id, index) => (index === 0 ? `?id=${id}` : `&id=${id}`)).join("");
    const res = await fetch(`http://localhost:3000/api/users/${searchParams}`, {
        method: "GET",
    });
    return res.json();
};

const getUserDonations = async () => {
    const { donations } = await getDonations();
    const userIds: string[] = donations
        .map((donation) => donation.userId)
        .filter((id, index, array) => array.indexOf(id) === index);
    const { users } = await getUsersByIds(userIds);
    const userDonations: UserDonation[] = [];
    for (let i = 0; i < donations.length; i++) {
        for (let j = 0; j < users.length; j++) {
            if (donations[i].userId === users[j].id) {
                userDonations.push({ donation: donations[i], user: users[j] });
            }
        }
    }
    return userDonations;
};

const Calendar = async () => {
    const userDonations = await getUserDonations();

    return (
        <div>
            <h2 className="text-base font-semibold leading-6 text-gray-900">Upcoming donations</h2>
            <div className="mt-4">
                <Donations userDonations={userDonations}/>
            </div>
        </div>
    );
};

export default Calendar;
