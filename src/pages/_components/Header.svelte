<script>
    import logo from "./assets/driveit-icon.svg";
    import { url, goto } from "@roxi/routify";
    import { user, unloadUser, removeToken } from '../api/user';
    import { OverflowMenu, OverflowMenuItem } from "carbon-components-svelte";

    let links = {
	    "Карта": "/",
	    "Статистика": "/stats",
    }

	if($user.role == "ADMIN") {
		links["Пользователи"] = "/users"
	}

	const logout = () => {
		removeToken();
		unloadUser();
	}
</script>

<div class="w-full h-[4rem] mb-6 flex bg-[#151f3f]">
	<div class="container px-4 mx-auto flex items-center">
		<img class="h-[2rem] mr-2 cursor-pointer" src={logo} alt="Логотип"
		     on:click={() => $goto("/")} on:keyup={() => $goto("/")}>

		<div class="overflow-auto flex items-center ml-12 gap-x-8 text-white flex-1 h-full">
			{#each Object.entries(links) as [title, link]}
				<a class="h-full text-white flex items-center px-2"
				   href={$url(link)}>{title}</a>
			{/each}
		</div>

		<OverflowMenu class="ml-4 overflow-menu md:ml-auto" flipped>
			<div slot="menu" class="w-auto h-full text-white
				flex items-center whitespace-nowrap">
				{$user.firstName} {$user.lastName}
			</div>
			<OverflowMenuItem
					href="https://api.noname.to/documentation"
					text="API документация" />
			<OverflowMenuItem
					on:click={logout}
					text="Выйти из аккаунта" />
		</OverflowMenu>
	</div>
</div>

<style>
	:global(.overflow-menu) {
		width: auto;
		height: 100%;
    }

	:global(.overflow-menu:hover,
			.overflow-menu.bx--overflow-menu--open) {
		background: inherit !important;
	}

	:global(.overflow-menu .bx--overflow-menu-options:after) {
		display: none !important;
	}

	:global(.overflow-menu:focus) {
        outline: medium auto currentColor;
	}

	:global(.overflow-menu:not(:focus-visible),
			.overflow-menu .bx--overflow-menu-options__btn:not(:focus-visible)) {
		outline: none !important;
	}
</style>