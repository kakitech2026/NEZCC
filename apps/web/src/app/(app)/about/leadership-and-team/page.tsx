import React from 'react';

export default function WhoIsWho() {
  return (
    <main className="flex-grow w-full max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop pt-16 md:pt-24 pb-stack-lg ">
      {/* Breadcrumbs & Page Title */}
      <div className="mb-stack-lg">

        <h1 className="font-serif font-medium md:font-serif font-medium text-headline-xl-mobile md:text-headline-xl text-on-surface">Leadership &amp; Team</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-2 max-w-3xl">Leadership and key personnel driving the cultural initiatives of the North East Zone Cultural Centre.</p>
      </div>

      {/* Top Leadership Section */}
      <section className="mb-12">
        <h2 className="font-serif font-medium text-headline-lg text-on-surface mb-stack-md border-b border-outline-variant pb-2">Leadership</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {/* Director Card */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-md shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-stack-md items-start">
            <div className="w-32 h-32 flex-shrink-0 rounded bg-surface-container overflow-hidden">
              <img alt="Shri Alobo Naga" className="w-full h-full object-cover" data-alt="A professional, high-quality headshot portrait of an authoritative official in formal attire." src="/images/about/Shri%20Alobo%20Naga.jpg" />
            </div>
            <div className="flex-grow">
              <h3 className="font-serif font-medium text-headline-md text-on-surface mb-1">Shri Alobo Naga</h3>
              <p className="font-label-md text-label-md text-primary-container mb-4">(Director)</p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-on-surface-variant text-base mt-1">mail</span>
                  <div className="font-body-md text-body-md text-on-surface-variant break-all">
                    <a className="hover:text-primary hover:underline block" href="mailto:nezccdimapur@yahoo.com">nezccdimapur@yahoo.com</a>
                    <a className="hover:text-primary hover:underline block" href="mailto:nezccdimapurNE@gmail.com">nezccdimapurNE@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Deputy Director Card */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-md shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-stack-md items-start">
            <div className="w-32 h-32 flex-shrink-0 rounded bg-surface-container overflow-hidden">
              <img alt="Shri Z. Lhousa" className="w-full h-full object-cover" data-alt="A formal, high-resolution portrait photograph of a government official wearing professional business attire." src="/images/about/shri_z_lhousa.jpeg" />
            </div>
            <div className="flex-grow">
              <h3 className="font-serif font-medium text-headline-md text-on-surface mb-1">Shri Z. Lhousa</h3>
              <p className="font-label-md text-label-md text-primary-container mb-4">(Deputy Director (A))</p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-on-surface-variant text-base mt-1">mail</span>
                  <div className="font-body-md text-body-md text-on-surface-variant break-all">
                    <a className="hover:text-primary hover:underline block" href="mailto:nezccdimapur@yahoo.com">nezccdimapur@yahoo.com</a>
                    <a className="hover:text-primary hover:underline block" href="mailto:nezccdimapurNE@gmail.com">nezccdimapurNE@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Officers & Staff Section */}
      <section>
        <h2 className="font-serif font-medium text-headline-lg text-on-surface mb-stack-md border-b border-outline-variant pb-2">Officers &amp; Staff</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {/* Staff Card 1 */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-md shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-surface-container overflow-hidden flex-shrink-0">
                <img alt="Shri Ashim Debnath" className="w-full h-full object-cover" data-alt="A small, professional headshot of an administrative officer against a clean, off-white background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5L10BZypRdG-5c39v5I59NZjUHu1Rx3vZ2DXepP_Sj0GA564VVs4GslzmcThFNO9cA4-eKimxVvGxJzZm9ymjHzV4Cd436Lpa4h_hSZnFdExVASQBinyAAevL1hCIM1NwPn9yMw7YSPiM9HzVe1iRJV54vBAA2kGxuo4ZjbXJG6lQH3jb3P7N7GfTNCJDyYNGTTcUOHQjUEZA9l9twwQgekzP7T_EhRTifS9_ifLlqGpyQCDV_Ch_cw" />
              </div>
              <div>
                <h4 className="font-serif font-medium text-headline-md text-on-surface text-lg">Shri Ashim Debnath</h4>
                <p className="font-label-md text-label-md text-primary-container">(Accounts Officer)</p>
              </div>
            </div>
          </div>
          {/* Staff Card 2 */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-md shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-surface-container overflow-hidden flex-shrink-0">
                <img alt="Shri Oliver T Pongen" className="w-full h-full object-cover" data-alt="A professional portrait of a program officer in an office setting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAIypq-7tXaNuJ_bs29T8MfEJT6PZNCbxsh5w6gYvSAjzhleBII6t_Rfj8bnc42PabMSAKkMU6CDvs6Z3LD-Knaz7Pa5vW2tiiUO91X0As3P0OXUHPuj1XHFBGbRY3IlVvrEFIS5JCvLzuh2zbya84k4XNLjy1AicmQLZEaFQJHmNqYNULvh9GF3i6ao9D6hTc1Dpi67BrD3ItekrUc34ykpGBovZk22xbCHszwMfGdziuAQZmW40wQQ" />
              </div>
              <div>
                <h4 className="font-serif font-medium text-headline-md text-on-surface text-lg">Shri Oliver T Pongen</h4>
                <p className="font-label-md text-label-md text-primary-container">(Programme Officer)</p>
              </div>
            </div>
          </div>
          {/* Staff Card 3 */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-md shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-surface-container overflow-hidden flex-shrink-0">
                <img alt="Shri P. Yanger Lemtur" className="w-full h-full object-cover" data-alt="A crisp, formal headshot of a section officer." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKMc92abHIWpWuC4LNAU7tYpfAEariWueieQwqg6HTmA6t5I_eLjlxuKWFlqaGsoAQRWWL8-gjGn5BqqweB1j3O0ssJUqQM_UcB2DN_qtKtgzxmQISOX4F_YeVmKV0-56Vb9ssmjZOTfHUasezJoQogmIiYWKbd37Rprdb5BBrIdJJfiy2cTnrV73ixxjdca6AsVFFLoKQ4Jk9Egk7jUyoDAnOyyK-E2_6rg1dGVTT9HQI4eHOWtKZiw" />
              </div>
              <div>
                <h4 className="font-serif font-medium text-headline-md text-on-surface text-lg">Shri P. Yanger Lemtur</h4>
                <p className="font-label-md text-label-md text-primary-container">(Section Officer (A))</p>
              </div>
            </div>
          </div>
          {/* Staff Card 4 */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-md shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-surface-container overflow-hidden flex-shrink-0">
                <img alt="Shri Yashilemba" className="w-full h-full object-cover" data-alt="A professional headshot of an exhibition officer." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmJVbZ2R9cuzrWxW3J7CWgC96nKEo9pCUH7eYq0sXzJ4B1VP1rANVShO7Nv27011Z3RHYTIfpb0fvATkWNB3JpmbereO_ld1Efa0XOPv_jcnmDqYFzCmqHSNuZGsxjHZ8-nu8l7R0F9wEFy6avVHvmt0eG5P597p2lV9MBWQuu9xBNdbWnIJxG46VFBXeIWURbeYKaPv_gc46e-431HTdGLwqoTD2Jy7-KRem_vsnL6Gd6hC7BgdOecQ" />
              </div>
              <div>
                <h4 className="font-serif font-medium text-headline-md text-on-surface text-lg">Shri Yashilemba</h4>
                <p className="font-label-md text-label-md text-primary-container">(Exhibition Officer)</p>
              </div>
            </div>
          </div>
          {/* Staff Card 5 */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-md shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-surface-container overflow-hidden flex-shrink-0">
                <img alt="Ms. Temsunaro" className="w-full h-full object-cover" data-alt="A high-quality professional portrait of a female research officer." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDr2YHjjRlrWwUl7JjQCnpaLxQVuLTrO1OjsgV-5CMY8PXx325Y-ZrhgkW8qDWr3qm8_PPVovphlPPHj6VIYWVIkycUgFvx2Nx-kKXgWr61Fb3ShhmdYbcTLnKHcYQzjV8D4l5ot2YBajNenP4g8XJOgnCp0v43GXbJg9qSE43GCh3WZ9OHl41lpA76JV9s8G-MrF1osczoZaJ6ECJRJWXq8Yirlz5ipNvxYbTHBbekamYCS4OSRv3ikQ" />
              </div>
              <div>
                <h4 className="font-serif font-medium text-headline-md text-on-surface text-lg">Ms. Temsunaro</h4>
                <p className="font-label-md text-label-md text-primary-container">(Research Officer)</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
