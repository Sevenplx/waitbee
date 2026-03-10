'use server'

import { createUser, verifyUser, createWaitlist, addSubscriber, createResetToken, resetPassword, deleteWaitlist, deleteSubscriber } from '@/lib/db';
import { setUserSession, clearUserSession, getAuthUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function signupAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  let success = false;
  try {
    const user = await createUser(email, password);
    await setUserSession(user.id, email);
    success = true;
  } catch (e: any) {
    console.error('Signup error:', e);
    if (e.message === 'User already exists') {
      redirect('/signup?error=exists');
    }
    // For other errors (like DB connection), let them bubble up or handle specifically
    throw e;
  }
  
  if (success) {
    redirect('/dashboard');
  }
}

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  try {
    const user = await verifyUser(email, password);
    if (!user) {
      redirect('/login?error=invalid');
    }
    await setUserSession(user.id, email);
  } catch (e: any) {
    if (e.digest?.includes('NEXT_REDIRECT')) throw e;
    console.error('Login error:', e);
    throw e;
  }
  redirect('/dashboard');
}

export async function logoutAction() {
  await clearUserSession();
  redirect('/');
}

export async function forgotPasswordAction(formData: FormData) {
  const email = formData.get('email') as string;
  const token = await createResetToken(email);
  
  if (token) {
    // In a real app, you would send an email here.
    // For this MVP, we'll just redirect to the reset page with the token.
    redirect(`/reset-password?token=${token}`);
  } else {
    // Even if email doesn't exist, we show success to prevent email enumeration
    redirect('/forgot-password?success=true');
  }
}

export async function resetPasswordAction(formData: FormData) {
  const token = formData.get('token') as string;
  const password = formData.get('password') as string;
  
  const success = await resetPassword(token, password);
  if (success) {
    redirect('/login?reset=success');
  } else {
    redirect('/reset-password?error=invalid');
  }
}

export async function createWaitlistAction(formData: FormData) {
  const user = await getAuthUser();
  if (!user) {
    redirect('/login');
  }

  const productName = formData.get('productName') as string;
  const description = formData.get('description') as string;
  const buttonText = formData.get('buttonText') as string;
  const bgColor = formData.get('bgColor') as string;

  const waitlist = await createWaitlist(user.id, {
    productName,
    description,
    buttonText,
    bgColor,
  });

  redirect(`/dashboard/${waitlist.id}`);
}

export async function subscribeAction(formData: FormData) {
  const waitlistId = formData.get('waitlistId') as string;
  const email = formData.get('email') as string;
  const slug = formData.get('slug') as string;

  const result = await addSubscriber(waitlistId, email);

  if (result.status === 'duplicate') {
    redirect(`/w/${slug}?msg=duplicate`);
  } else if (result.status === 'full') {
    redirect(`/w/${slug}?msg=full`);
  } else {
    redirect(`/w/${slug}?msg=success`);
  }
}

export async function deleteWaitlistAction(id: string) {
  const user = await getAuthUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  await deleteWaitlist(id, user.id);
  revalidatePath('/dashboard');
}

export async function deleteSubscriberAction(id: string, waitlistId: string) {
  const user = await getAuthUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  await deleteSubscriber(id, waitlistId, user.id);
  revalidatePath(`/dashboard/${waitlistId}`);
}
