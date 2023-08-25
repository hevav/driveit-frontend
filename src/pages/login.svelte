<script>
    import { ContentSwitcher, Switch, TextInput, PasswordInput,
        Button, ButtonSet, Form } from "carbon-components-svelte";

    import Login from "carbon-icons-svelte/lib/Login.svelte";
    import logo from "./_components/assets/driveit-logo.svg";

    // import api, {setToken, loadUser} from "./_api";
	import {api} from "./api";
	import {loadUser, setToken} from './api/user';
    import {writable} from "svelte/store";
    import {goto} from "@roxi/routify";
	import {onMount} from "svelte";

    let username = "";
    let password = "";
	let wrapper;

    // let error = "Неверный логин или пароль.";
	$: error = writable("");
    $: ready = writable(true);

    const submit = (event) => {
		event.preventDefault();

        $error = "";
        $ready = false;

		// await api.auth.signIn({login: username, password: password})

		api.auth.signIn({login: username, password: password})
			.then(async (user) => {
				// api.setSecurityData(user.data.token);
				setToken(user.data.token);
				wrapper.style.display = "none";
				await loadUser();
				$goto('./', {}, false);
			})
			.catch((e) => {
				$error = e.response.data.message || e.message;
			})
			.finally(() => {
				$ready = true;
			});

        /*try {
            const data = await api.user.signIn(username, password);

			console.log(data);
            setToken(data.token);
            wrapper.style.display = "none"
            await loadUser();

            $goto('./', {}, false);
            wrapper.style.display = undefined
        } catch (e) {
            $error = e.message;
        } finally {
	        $ready = true;
        }*/
    }
</script>

<div class="login--wrapper min-h-screen justify-center" bind:this={wrapper}>
	<img class="h-8 w-max" src={logo} alt="logo">
	<div class="login--tile">
		<Form on:submit={submit}>
			<h3 class="mb-2 font-medium text-white">Вход в аккаунт</h3>
			<TextInput labelText="Логин" placeholder="ivan.ivanov"
					invalid={!!$error} invalidText={$error}
					type="text" bind:value={username} />
			<PasswordInput labelText="Пароль" placeholder="••••••••"
						bind:value={password}/>
			<ButtonSet class="mt-2" stacked>
				<Button class="bx--btn--full" icon={Login}
						skeleton={!$ready} type="submit">Войти</Button>
			</ButtonSet>
		</Form>
	</div>

	<style>
		#app {
			background: url("/static/login-background.png") no-repeat;
			background-color: #151f3f;
			background-size: contain;
		}
	</style>
</div>

<style>
	:global(.login--wrapper .bx--label) {
		color: #bbbbbb;
	}

	.login--wrapper {
		width: 100%;
		max-width: 480px;

		margin: auto;
		row-gap: 2rem;

		display: flex;
		flex-direction: column;
	}

	.login--tile {
		width: 100%;
		max-width: 480px;

		padding: 1.5rem;
        row-gap: 1rem;

        display: flex;
		flex-direction: column;

        background-color: #1f2d5a;
	}
</style>