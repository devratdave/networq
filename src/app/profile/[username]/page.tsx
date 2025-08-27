import { getProfileByUsername, getUserLikedPosts, getUserPosts, isFollowing } from "@/actions/profile.action";
import { notFound } from "next/navigation";
import ProfilePageClient from "./ProfilePageClient";
import { getDbUserId } from "@/actions/user.action";

export async function generateMetadata({ params }: { params: { username: string } }) {
  const profileUser = await getProfileByUsername(params.username);
  if (!profileUser) return;

  return {
    title: `${profileUser.name ?? profileUser.username}`,
    description: profileUser.bio || `Check out ${profileUser.username}'s profile.`,
  };
}

async function page({ params }: { params: { username: string } }) {
  const profileUser = await getProfileByUsername(params.username);
  if (!profileUser) notFound();

  const [posts, likedPosts, isCurrentUserFollowing, loggedInUserId] = await Promise.all([
    getUserPosts(profileUser.id),
    getUserLikedPosts(profileUser.id),
    isFollowing(profileUser.id),
    getDbUserId(), // ⬅️ get current user ID here
  ])

  return (
    <ProfilePageClient
      profileUser={profileUser}
      posts={posts}
      likedPosts={likedPosts}
      isFollowing={isCurrentUserFollowing}
      loggedInUserId={loggedInUserId}
    />
  );
}

export default page;
