import { Container, Text } from '@mantine/core';
import type { V2_MetaFunction , LoaderArgs } from "@remix-run/node";
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react';
import { createServerClient } from '@supabase/auth-helpers-remix'
import type { Database } from '~/types/database.types';
import Login from '~/components/login';

export const loader = async ({ request }: LoaderArgs) => {
  const response = new Response()
  const supabaseClient = createServerClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    { request, response }
  )

  const { data } = await supabaseClient.from('Test').select('*')

  return json(
    { data },
    {
      headers: response.headers,
    }
  )
}


export const meta: V2_MetaFunction = () => {
  return [
    { title: "test" },
  ];
};

export default function Index() {

  const test = useLoaderData<typeof loader>()

  return (
    <Container>
      <Text>{JSON.stringify(test)}</Text>
	  <Login/>
    </Container>
  );
}
