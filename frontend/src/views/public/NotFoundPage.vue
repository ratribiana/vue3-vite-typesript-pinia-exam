<template>
  <div>
    <div class="m-auto my-72">
      <section>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 border border-gray-300 dark:bg-black dark:border-black opacity-60">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8 h-[250px]">
              <h1 class="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Ooops! 404 Not Found
              </h1>
              <div class="w-full text-white float-left">Page not found. Don't worry though, we have plenty of other pages to explore</div>
              <RouterLink
                to="/"
                class="float-left my-2 w-full text-center items-center relative bg-blue hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                >Back to home</RouterLink
              >
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
