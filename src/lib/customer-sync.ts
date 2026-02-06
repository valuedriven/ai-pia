import { supabase } from "@/lib/supabase";

export async function ensureCustomerExists(user: any) {
    if (!user || !user.primaryEmailAddress?.emailAddress) {
        return null;
    }

    const email = user.primaryEmailAddress.emailAddress;
    const name = user.fullName || user.username || email.split('@')[0];

    // Check if customer exists
    const { data: existingCustomer, error: fetchError } = await supabase
        .from('customers')
        .select('id')
        .eq('email', email)
        .single();

    if (existingCustomer) {
        return existingCustomer.id;
    }

    if (fetchError && fetchError.code !== 'PGRST116') {
        console.error("Error checking for existing customer:", fetchError);
        throw fetchError;
    }

    // Create new customer
    const initials = name.split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0, 2);
    const colors = ['bg-blue-500/10 text-blue-500', 'bg-purple-500/10 text-purple-500', 'bg-emerald-500/10 text-emerald-500', 'bg-orange-500/10 text-orange-500'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const { data: newCustomer, error: createError } = await supabase
        .from('customers')
        .insert([
            {
                name,
                email,
                phone: user.primaryPhoneNumber?.phoneNumber || "",
                address: "", // Can be updated later
                initials,
                color: randomColor
            }
        ])
        .select('id')
        .single();

    if (createError) {
        console.error("Error creating new customer:", createError);
        throw createError;
    }

    return newCustomer.id;
}
